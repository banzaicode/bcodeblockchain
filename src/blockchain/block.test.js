import Block from './block.js';

describe('Block', () => {
    let timestamp;
    let prevBlock;
    let data;
    let hash;
    let nonce;
    let difficulty;

    beforeEach(() => {
        timestamp = new Date(2010, 0, 1);
        prevBlock = Block.genesis;
        data = 'data-block';
        hash = 'hash-block';
        nonce = 128;
        difficulty = 3;
    });
        
    it('create an instance with parameters', () => {
        const block = new Block(timestamp, prevBlock.hash, hash, data, nonce, difficulty);

        expect(block.timestamp).toEqual(timestamp);
        expect(block.prevHash).toEqual(prevBlock.hash);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });

    it('use static mine()', () => {
        const block = Block.mine(prevBlock, data);
        const { difficulty } = block;

        expect(block.hash.length).toEqual(64);
        expect(block.hash.substring(0, difficulty)).toEqual('0'.repeat(difficulty));
        expect(block.prevHash).toEqual(prevBlock.hash);
        expect(block.nonce).not.toEqual(0);
        expect(block.data).toEqual(data);
    });

    // We have the same data to mine the block.
    // The hash output will always be the same for the same set of data.
    it.skip('use static hash()', () => {
        const hash = Block.hash(timestamp, prevBlock.hash, data, nonce, difficulty);
        const hashOutput = '56b7439337917f69705fc998e7e581e04681887085470f3e3ecd3067d7c7e71d';
        
        expect(hash).toEqual(hashOutput);
    });

    it('use toString()', () => {
        const block = Block.mine(prevBlock, data);

        expect(typeof block.toString()).toEqual('string');
    });
});