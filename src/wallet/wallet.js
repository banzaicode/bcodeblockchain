import { elliptic, generateHash } from '../modules';
import Transaction from './transaction';

const INITIAL_BALANCE = 0;

class Wallet {
    constructor(blockchain, initialBalance = INITIAL_BALANCE) {
        this.balance = initialBalance;
        this.keyPair = elliptic.createKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
        this.blockchain = blockchain;
    }

    sign(data){
        return this.keyPair.sign(generateHash(data));
    }

    createTransaction(receiverAddress, amount) {
        const { balance, blockchain: { memoryPool } } = this;

        if (amount > balance) throw Error(`the amount is greater than the balance`)
        let transaction = memoryPool.find(this.publicKey);
        if (transaction) {
          transaction.update(this, receiverAddress, amount);
        } else {
          transaction = Transaction.create(this, receiverAddress, amount);
          memoryPool.addOrUpdate(transaction);
        }
    
        return transaction;
    }

    toString() {
        const { balance, publicKey } = this;

        return ` Wallet -
            publicKey     : ${publicKey.toString()}
            balance       : ${balance}
        `;
    }
}

export { INITIAL_BALANCE };

export default Wallet;