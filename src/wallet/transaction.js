import uuidV1 from 'uuid/v1';

class Transaction {
    constructor() {
        this.id = uuidV1();
        this.input = null;
        this.output = [];
    };

    static create(senderWallet, receiverAddress, amount){
        const { balance, publicKey } = senderWallet;

        if(amount > balance) throw Error(`Amount: ${amount} exceeds balance.`);

        const transaction = new Transaction();
        transaction.output.push(...[
            { amount: balance - amount, address: publicKey },
            { amount, address: receiverAddress },
        ]);
    };
};

export default Transaction;
