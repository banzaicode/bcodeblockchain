class Block {
  constructor(timestamp, prevHash, hash, data) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
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
