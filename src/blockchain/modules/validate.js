import Block from '../Block';

export default (Blockchain) => {
    const [genesisBlock, ...blocks] = Blockchain;

    if(genesisBlock !== Block.genesis) {
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