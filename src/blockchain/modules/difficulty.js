const MINE_RATE = 3000;
const ADJUST = 1;

export default (prevBlock, timestamp) => {
    const { difficulty } = prevBlock;
    return prevBlock.timestamp + MINE_RATE > timestamp
        ? difficulty + ADJUST
        : difficulty - ADJUST
}