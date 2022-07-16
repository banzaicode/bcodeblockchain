import Block from '../block.js';

export default (Blockchain) => {
    const [genesisBlock, ...blocks] = Blockchain;

    if(JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) {
        throw Error('Invalid Genesis Block');
    } 

    for (let i = 0; i < blocks.length; i += 1){
        const { prevHash, timestamp, hash, data } = blocks[i];
        const prevBlock = Blockchain[i];

        if(prevHash !== prevBlock.hash) {
            throw Error('Invalid previous hash');
        }
        if(hash !== Block.hash(timestamp, prevHash, data)) {
            throw Error('Invalid hash');
        }
    }
    return true;
}