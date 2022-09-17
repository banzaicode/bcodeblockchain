import { elliptic, generateHash } from '../modules';
import Transaction from './transaction';

const INITIAL_BALANCE = 100;

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
        const { currentBalance, blockchain: { memoryPool } } = this;

        if (amount > currentBalance) throw Error(`the amount is greater than the balance`)
        let transaction = memoryPool.find(this.publicKey);
        if (transaction) {
          transaction.update(this, receiverAddress, amount);
        } else {
          transaction = Transaction.create(this, receiverAddress, amount);
          memoryPool.addOrUpdate(transaction);
        }
    
        return transaction;
    }

    get currentBalance() {
        const { blockchain: { blocks = [] }, publicKey } = this;
        let { balance } = this;
        const transactions = [];

        blocks.forEach(({ data = [] }) => {
            if (Array.isArray(data)) data.forEach((tx) => transactions.push(tx));
        });

        const walletInputTransactions = transactions.filter((tx) => tx.input.address === publicKey);
        let timestamp = 0;

        if (walletInputTransactions.length > 0) {
            const recentInputTransactions = walletInputTransactions
                .sort((a, b) => a.input.timestamp - b.input.timestamp)
                .pop();

            balance = recentInputTransactions.outputs.find(({address}) => address === publicKey).amount;
            timestamp = recentInputTransactions.input.timestamp;
        }

        transactions
            .filter(({ input }) => input.timestamp > timestamp)
            .forEach(({ outputs }) => {
                outputs.find(({ address, amount }) => {
                    if (address === publicKey) balance += amount;
                });
            });

        return balance;
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