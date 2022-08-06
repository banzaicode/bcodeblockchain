import adjustDifficulty from './modules/difficulty';
import generateHash from '../modules/hash';

const DIFFICULTY = 3;

class Block {
  constructor(timestamp, prevHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static get genesis() {
    const timestamp = (new Date(2010, 0, 1)).getTime();
    const data = 'genesis-data';
    const hash = Block.hash(timestamp, undefined, data);
    return new this(timestamp, undefined, hash, data, 0, DIFFICULTY);
  }

  static mine(prevBlock, data) {
    const { hash: prevHash } = prevBlock;
    let timestamp;
    let hash;
    let nonce = 0;
    let { difficulty } = prevBlock;

    do {
      timestamp = Date.now();
      nonce += 1;
      difficulty = adjustDifficulty(prevBlock, timestamp);
      hash = Block.hash(timestamp, prevHash, data, nonce, difficulty);

    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, prevHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, prevHash, data, nonce, difficulty) {
    return generateHash(`${timestamp}${prevHash}${data}${nonce}${difficulty}`);
  }

  toString() {
    const {
      timestamp, prevHash, hash, data, nonce, difficulty
    } = this;

    return `Block - 
        timestamp: ${timestamp}
        prevHash:  ${prevHash}
        hash:      ${hash}
        data:      ${data}
        nonce:     ${nonce}
        difficulty:${difficulty}
        `;
  }
}

export { DIFFICULTY };

export default Block;
