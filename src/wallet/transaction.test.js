import Transaction, { REWARD } from './transaction';
import Wallet from './wallet';
import { blockchainWallet } from './index';

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

    it('validates a valid transaction', () => {
        expect(Transaction.verify(transaction)).toBe(true);
    })

    it('invalidates a valid transaction', () => {
        transaction.outputs[0].amount = 500;

        expect(Transaction.verify(transaction)).toBe(false);
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

    describe('and updating a transaction', () => {
        let nextAmount;
        let nextAddress;
    
        beforeEach(() => {
            nextAmount = 3;
            nextAddress = 'n3xt-4ddr3ss';
            transaction = transaction.update(wallet, nextAddress, nextAmount);
        });
    
        it('subtracts the next amount from the senders wallet', () => {
            const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
            expect(output.amount).toEqual(wallet.balance - amount - nextAmount);
        });
    
        it('outputs an amount for the next receiver', () => {
            const output = transaction.outputs.find(({ address }) => address === nextAddress);
            expect(output.amount).toEqual(nextAmount);
        });
    });
    
    describe('creating a reward transaction', () => {
        beforeEach(() => {
            blockchainWallet.balance = 100;
            transaction = Transaction.reward(wallet, blockchainWallet);
        });
    
        it('reward the miners wallet', () => {
            expect(transaction.outputs.length).toEqual(2);

            let output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
            expect(output.amount).toEqual(REWARD);

            output = transaction.outputs.find(({ address }) => address === blockchainWallet.publicKey);
            expect(output.amount).toEqual(blockchainWallet.balance - REWARD);
        });
    });
});