import Block from './src/blockchain/Block.js';

const block1 = new Block(Date.now(), 'a', 'b', 'c');
console.log(block1.toString());
