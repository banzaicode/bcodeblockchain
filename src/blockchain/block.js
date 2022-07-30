import pkg from 'crypto-js';

const DIFFICULTY = 3;

class Block {
  constructor(timestamp, prevHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  static get genesis() {
    const timestamp = (new Date(2010, 0, 1)).getTime();
    const data = 'genesis-data';
    const hash = Block.hash(timestamp, undefined, data);
    return new this(timestamp, undefined, hash, data);
  }

  static mine(prevBlock, data) {
    const { hash: prevHash } = prevBlock;
    let timestamp;
    let hash;
    let nonce = 0;

    do {
      timestamp = Date.now();
      nonce += 1;
      hash = Block.hash(timestamp, prevHash, data, nonce);

    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, prevHash, hash, data, nonce);
  }

  static hash(timestamp, prevHash, data, nonce) {
    const { SHA256 } = pkg;
    return SHA256(`${timestamp}${prevHash}${data}${nonce}`).toString();
  }

  toString() {
    const {
      timestamp, prevHash, hash, data, nonce,
    } = this;

    return `Block - 
        timestamp: ${timestamp}
        prevHash:  ${prevHash}
        hash:      ${hash}
        data:      ${data}
        nonce:     ${nonce}
        `;
  }
}

export { DIFFICULTY };

export default Block;
