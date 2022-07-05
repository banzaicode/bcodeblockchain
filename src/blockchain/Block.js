import pkg from 'crypto-js';

class Block {
  constructor(timestamp, prevHash, hash, data) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
  }

  static get genesis() {
    const timestamp = (new Date(2010, 0, 1)).getTime();
    const data = 'genesis-data';
    const hash = Block.hash(timestamp, undefined, data);
    return new this(timestamp, undefined, hash, data);
  }

  static hash(timestamp, prevHash, data) {
    const { SHA256 } = pkg;
    return SHA256(`${timestamp}${prevHash}${data}`).toString();
  }

  toString() {
    const {
      timestamp, prevHash, hash, data,
    } = this;

    return `Block - 
        timestamp: ${timestamp}
        prevHash:  ${prevHash}
        hash:      ${hash}
        data:      ${data}
        `;
  }
}

export default Block;
