import Block from './block.js';
import validate from './modules/validate.js';
import MemoryPool from './memoryPool.js';

class Blockchain {
    constructor() {
        this.blocks = [Block.genesis];
        this.memoryPool = new MemoryPool();
    }

    addBlock(data) {
        const prevBlock = this.blocks[this.blocks.length - 1];
        const block = Block.mine(prevBlock, data);

        this.blocks.push(block);

        return block;
    }

    replace(newBlocks = []) {
        if(newBlocks.length < this.blocks.length) {
            throw Error('Received chain is not longer than current chain');
        }
        try {
            validate(newBlocks);
        } catch(error) {
            throw Error('Received chain is invalid');
        }

        this.blocks = newBlocks;
        
        return this.blocks;
    }
}

export default Blockchain;