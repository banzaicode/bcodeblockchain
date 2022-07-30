import Block, { DIFFICULTY } from './block.js';

describe('Block', () => {
    let timestamp;
    let prevBlock;
    let data;
    let hash;
    let nonce;

    beforeEach(() => {
        timestamp = new Date(2010, 0, 1);
        prevBlock = Block.genesis;
        data = 'data-block';
        hash = 'hash-block';
        nonce = 128;
    });
        
    it('create an instance with parameters', () => {
        const block = new Block(timestamp, prevBlock.hash, hash, data, nonce);

        expect(block.timestamp).toEqual(timestamp);
        expect(block.prevHash).toEqual(prevBlock.hash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
    });

    it('use static mine()', () => {
        const block = Block.mine(prevBlock, data);

        expect(block.hash.length).toEqual(64);
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
        expect(block.prevHash).toEqual(prevBlock.hash);
        expect(block.nonce).not.toEqual(0);
        expect(block.data).toEqual(data);
    });

    // We have the same data to mine the block.
    // The hash output will always be the same for the same set of data.
    it('use static hash()', () => {
        const hash = Block.hash(timestamp, prevBlock.hash, data, nonce);
        const hashOutput = '305d3a6249fa2497f0aa6696d6886ee4476315c55593952a06ea7dad30fb7f23';
        
        expect(hash).toEqual(hashOutput);
    });

    it('use toString()', () => {
        const block = Block.mine(prevBlock, data);

        expect(typeof block.toString()).toEqual('string');
    });
});