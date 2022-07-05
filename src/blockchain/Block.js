import pkg from 'crypto-js';

class Block {
  constructor(timestamp, prevHash, hash, data) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
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
