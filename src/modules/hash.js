import pkg from 'crypto-js';

const { SHA256 } = pkg;

export default (data) => SHA256(JSON.stringify(data)).toString();