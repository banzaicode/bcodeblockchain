import express from 'express';
import bodyParser from 'body-parser';

import Blockchain from '../blockchain/index.js';
import Wallet from '../wallet/index.js';
import NetworkService, { MESSAGES } from './network.js';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();
const wallet = new Wallet(blockchain);
const networkService = new NetworkService(blockchain);

app.use(bodyParser.json());

app.get('/blocks', (request, response) => {
    response.json(blockchain.blocks);
});

app.get('/nodes', (request, response) => {
    response.json(networkService.sockets.length);
});

app.post('/mine', (request, response) => {
    const { body: { data } } = request;
    const block = blockchain.addBlock(data);

    networkService.sync();

    response.json({
        blocks: blockchain.blocks.length,
        block,
    });
});

app.get('/transactions', (req, res) => {
    const { memoryPool: { transactions } } = blockchain;
    res.json(transactions);
  });
  
  app.post('/transaction', (req, res) => {
    const { body: { recipient, amount } } = req;
  
    try {
      const tx = wallet.createTransaction(recipient, amount);
      networkService.broadcast(MESSAGES.TX, tx);
      res.json(tx);
    } catch (error) {
      res.json({ error: error.message });
    }
  });

app.listen(HTTP_PORT, () => {
    console.log(`Service HTTP:${HTTP_PORT} ready...`);
    networkService.listen();
});