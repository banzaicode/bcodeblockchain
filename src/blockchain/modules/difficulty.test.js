import Block from '../block';
import adjustDifficulty from './difficulty';

describe('adjustDifficulty()', () => {
    let block;

    beforeEach(() => {
        block = { timestamp: Date.now(), difficulty: 3 };
    });

    it('reduce difficulty by blocks mined more slowly', () => {
        expect(adjustDifficulty(block, block.timestamp + 5000)).toEqual(block.difficulty - 1);
    })

    it('increment difficulty by blocks mined more faster', () => {
        expect(adjustDifficulty(block, block.timestamp + 1000)).toEqual(block.difficulty + 1);
    })    
});