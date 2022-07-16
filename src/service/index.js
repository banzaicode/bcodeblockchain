import express from 'express';
import bodyParser from 'body-parser';

import Blockchain from '../blockchain/index.js';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

app.get('/blocks', (request, response) => {
    response.json(blockchain.blocks);
});

app.post('/mine', (request, response) => {
    const { body: { data } } = request;
    const block = blockchain.addBlock(data);

    response.json({
        blocks: blockchain.blocks.length,
        block,
    });
});

app.listen(HTTP_PORT, () => {
    console.log(`Service HTTP:${HTTP_PORT} ready...`);
});