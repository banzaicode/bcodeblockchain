import { v1 as uuidV1 } from 'uuid';
import { elliptic } from '../modules';

class Transaction {
    constructor() {
        this.id = uuidV1();
        this.input = null;
        this.outputs = [];
    };

    static create(senderWallet, receiverAddress, amount){
        const { balance, publicKey } = senderWallet;

        if(amount > balance) throw Error(`Amount: ${amount} exceeds balance.`);

        const transaction = new Transaction();
        transaction.outputs.push(...[
            { amount: balance - amount, address: publicKey },
            { amount: amount, address: receiverAddress },
        ]);

        transaction.input = Transaction.sign(transaction, senderWallet);

        return transaction;
    };

    static verify(transaction) {
        const { input: { address, signature }, outputs } = transaction;

        return elliptic.VerifySignature(address, signature, outputs);
    }

    static sign(transaction, senderWallet) {
        return {
          timestamp: Date.now(),
          amount: senderWallet.balance,
          address: senderWallet.publicKey,
          signature: senderWallet.sign(transaction.outputs),
        };
    }

    update(senderWallet, receiverAddress, amount) {
        const senderOutput = this.outputs.find((output) => output.address === senderWallet.publicKey);
    
        if (amount > senderOutput.amount) throw Error(`Amount: ${amount} exceeds balance`);
    
        senderOutput.amount -= amount;
        this.outputs.push({ amount, address: receiverAddress });
        this.input = Transaction.sign(this, senderWallet);
    
        return this;
    }    
};

export default Transaction;
