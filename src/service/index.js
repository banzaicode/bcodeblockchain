import express from 'express';
import bodyParser from 'body-parser';

import Blockchain from '../blockchain/index.js';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

app.listen(HTTP_PORT, () => {
    console.log(`Service HTTP:${HTTP_PORT} ready...`);
});