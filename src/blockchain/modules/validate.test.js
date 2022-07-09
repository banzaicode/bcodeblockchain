import Blockchain from "../Blockchain";
import validate from './validate';

describe('validate()', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
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
});