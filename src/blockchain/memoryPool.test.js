import MemoryPool from './memoryPool';
import Wallet, { Transaction } from '../wallet';

describe('MemoryPool', () => {
  let memoryPool;
  let wallet;
  let transaction;
  let amount;
  let receiverAddress;  

  beforeEach(() => {
    memoryPool = new MemoryPool();
    wallet = new Wallet();
    wallet.balance = 100;
    receiverAddress = 'receiver-test';
    amount = 5;    
    transaction = Transaction.create(wallet, receiverAddress, amount);
    memoryPool.addOrUpdate(transaction);
  });

  it('has one transaction', () => {
    expect(memoryPool.transactions.length).toEqual(1);
  });

  it('adds a transaction to the memoryPool', () => {
    const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
    expect(found).toEqual(transaction);
  });

  it('updates a transaction in the memoryPool', () => {
    const transactionOrigin = JSON.stringify(transaction);
    const transactionModify = transaction.update(wallet, 'receiver-test-2', 10);

    memoryPool.addOrUpdate(transactionModify);

    expect(memoryPool.transactions.length).toEqual(1);

    const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
    expect(JSON.stringify(found)).not.toEqual(transactionOrigin);
    expect(transactionModify).toEqual(found);
  });

  it('find a transaction in the memoryPool', () => {
    const { publicKey } = wallet;
    const found = memoryPool.find(publicKey);

    expect(memoryPool.transactions.length).toEqual(1);
    expect(found).not.toEqual(undefined);
  });
});