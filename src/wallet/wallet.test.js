import Wallet, { INITIAL_BALANCE } from './wallet';
import Blockchain from '../blockchain';

describe('Wallet', () => {
    let wallet;
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
        wallet = new Wallet(blockchain);
    });

    it('it is a healthy wallet', () => {
        expect(wallet.balance).toEqual(INITIAL_BALANCE);
        expect(typeof wallet.keyPair).toEqual('object');
        expect(typeof wallet.publicKey).toEqual('string');
        expect(wallet.publicKey.length).toEqual(130);
    })

    it('use toString()', () => {
        expect(typeof wallet.toString()).toEqual('string');
    });

    it('use sign()', () => {
        const signature = wallet.sign('data-test-sign');
        expect(typeof signature).toEqual('object');
        expect(signature).toEqual(wallet.sign('data-test-sign'));
    })

    describe('creating a transaction from wallet', () => {
        let transaction;
        let receiverAddress;
        let amount;

        beforeEach(() => {
            wallet.balance = 100;
            receiverAddress = 'test-address';
            amount = 5;
            transaction = wallet.createTransaction(receiverAddress, amount);
        });

        describe('creating another same transaction', () => {
            beforeEach(() => {
                wallet.balance = 100;
                transaction = wallet.createTransaction(receiverAddress, amount);
            })

            it('double the `amount` subtracted from the wallet balance', () => {
                const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
                expect(output.amount).toEqual(wallet.balance - (amount * 2));
            });
        
            it('clones the `amount` output for the receiver', () => {
                const amounts = transaction.outputs
                    .filter(({ address }) => address === receiverAddress)
                    .map((output) => output.amount);
    
                expect(amounts).toEqual([amount, amount]);
            });            
        });
    });

    describe('calculating current wallet balance', () => {
        let addBalance;
        let times;
        let senderWallet;
    
        beforeEach(() => {
          addBalance = 22;
          times = 3;
          senderWallet = new Wallet(blockchain);
    
          for (let i = 0; i < times; i++) {
            senderWallet.createTransaction(wallet.publicKey, addBalance);
          }
    
          blockchain.addBlock(blockchain.memoryPool.transactions);
        });
    
        it('calculates the balance for blockchain transactions matching the recipient', () => {
          expect(wallet.currentBalance).toEqual(INITIAL_BALANCE + (addBalance * times));
        });
    
        it('calculates the balance for blockchain transactions matching the sender', () => {
          expect(senderWallet.currentBalance).toEqual(INITIAL_BALANCE - (addBalance * times));
        });
    
        describe('and the recipient conducts a transaction', () => {
          let subtractBalance = 0;
          let recipientBalance = 0;
    
          beforeEach(() => {
            blockchain.memoryPool.wipe();
            subtractBalance = 88;
            recipientBalance = wallet.currentBalance;
    
            wallet.createTransaction(senderWallet.publicKey, addBalance);
    
            blockchain.addBlock(blockchain.memoryPool.transactions);
          });
    
          describe('and the sender sends another transaction to the recipient', () => {
            beforeEach(() => {
              blockchain.memoryPool.wipe();
              senderWallet.createTransaction(wallet.publicKey, addBalance);
    
              blockchain.addBlock(blockchain.memoryPool.transactions);
            });
    
            it('calculate the recipient balance only using transactions since its most recent one', () => {
              expect(wallet.currentBalance).toEqual(recipientBalance - subtractBalance + addBalance);
            });
          });
        });
    });    
})