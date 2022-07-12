import Blockchain from "../blockchain";
import validate from './validate';

describe('validate()', () => {
    let blockchain;
    let blockchainAltNode;

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchainAltNode = new Blockchain();
    });

    it('validate a valid chain', () => {
        blockchain.addBlock('block-01');
        blockchain.addBlock('block-02');

        expect(validate(blockchain.blocks)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        blockchain.blocks[0].data = 'data invalid';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Invalid Genesis Block');
    });

    it('invalidates a chain with a corrupt prevHash within a block', () => {
        blockchain.addBlock('block-01');
        blockchain.blocks[1].prevHash = 'hash-invalid';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Invalid previous hash');
    });

    it('invalidates a chain with a corrupt hash within a block', () => {
        blockchain.addBlock('block-01');
        blockchain.blocks[1].hash = 'hash-invalid';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Invalid hash');
    });

    it('replace the chain with a valid chain', () => {
        blockchainAltNode.addBlock('Block-01');
        blockchain.replace(blockchainAltNode.blocks);

        expect(blockchain.blocks).toEqual(blockchainAltNode.blocks);
    });

    it('does not replace the chain with one with less block', () => {
        blockchain.addBlock('Block-01');

        expect(() => {
            blockchain.replace(blockchainAltNode.blocks);
        }).toThrowError('Received chain is not longer than current chain');
    });

    it('not replace the chain with same block is not valid', () => {
        blockchainAltNode.addBlock('Block-01');
        blockchainAltNode.blocks[1].data = 'data-invalid';

        expect(() => {
            blockchain.replace(blockchainAltNode.blocks);
        }).toThrowError('Received chain is invalid');
    });
});