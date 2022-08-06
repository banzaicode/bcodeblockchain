import Transaction from './transaction';
import Wallet from './wallet';

describe('Transaction', () => {
    let wallet;
    let transaction;
    let amount;
    let receiverAddress;

    beforeEach(() => {
        wallet = new Wallet();
        wallet.balance = 100;
        receiverAddress = 'receiver-test';
        amount = 5;
        transaction = Transaction.create(wallet, receiverAddress, amount);
    });

    it('output te amount subtracted from the wallet balance', () => {
        const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
        expect(output.amount).toEqual(wallet.balance - amount);
    });

    it('outputs the amount added to the receiver', () => {
        const output = transaction.outputs.find(({ address }) => address === receiverAddress);
        expect(output.amount).toEqual(amount);
    });

    it('inputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('inputs the sender address of the wallet', () => {
        expect(transaction.input.address).toEqual(wallet.publicKey);
    });

    describe('transacting with an amount that exceeds the balance', () => {
        beforeEach(() => {
            amount = 500;
            transaction = undefined;
        });

        it('does not create the transaction', () => {
            expect(() => {
                transaction = Transaction.create(wallet, receiverAddress, amount);
            }).toThrowError(`Amount: ${amount} exceeds balance.`);
        });
    });
});