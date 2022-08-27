import { Transaction, blockchainWallet } from '../wallet';
import { MESSAGES } from '../service/network';

class Miner {
    constructor(blockchain, networkService, wallet) {
      this.blockchain = blockchain;
      this.networkService = networkService;
      this.wallet = wallet;
    }
  
    mine() {
      const {
        blockchain: { memoryPool },
        networkService,
        wallet,
      } = this;

      if (memoryPool.transactions.length === 0) throw Error('There are no unconfirmed transactions.');

      memoryPool.transactions.push(Transaction.reward(wallet, blockchainWallet));
      const block = this.blockchain.addBlock(memoryPool.transactions);
      networkService.sync();
      memoryPool.wipe();
      networkService.broadcast(MESSAGES.TXWIPE);

      return block;
    }
  }
  
  export default Miner;