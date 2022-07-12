import Block from './block';

describe('Block', () => {
    let timestamp;
    let prevBlock;
    let data;
    let hash;

    beforeEach(() => {
        timestamp = new Date(2010, 0, 1);
        prevBlock = Block.genesis;
        data = 'data-block';
        hash = 'hash-block';
    });
        
    it('create an instance with parameters', () => {
        const block = new Block(timestamp, prevBlock.hash, hash, data);

        expect(block.timestamp).toEqual(timestamp);
        expect(block.prevHash).toEqual(prevBlock.hash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
    });

    it('use static mine()', () => {
        const block = Block.mine(prevBlock, data);

        expect(block.hash.length).toEqual(64);
        expect(block.prevHash).toEqual(prevBlock.hash);
        expect(block.data).toEqual(data);
    });

    // We have the same data to mine the block.
    // The hash output will always be the same for the same set of data.
    it('use static hash()', () => {
        const hash = Block.hash(timestamp, prevBlock.hash, data);
        const hashOutput = '164213f7110605b5444f8c9e4c267c4cd89f5416d14d192a3af4799257e31940';
        
        expect(hash).toEqual(hashOutput);
    });

    it('use toString()', () => {
        const block = Block.mine(prevBlock, data);

        expect(typeof block.toString()).toEqual('string');
    });
});