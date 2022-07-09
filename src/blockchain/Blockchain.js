import Block from './Block.js';

class Blockchain {
    constructor() {
        this.blocks = [Block.genesis];

    }

    addBlock(data) {
        const prevBlock = this.blocks[this.blocks.length - 1];
        const block = Block.mine(prevBlock, data);

        this.blocks.push(block);

        return block;
    }
}

export default Blockchain;