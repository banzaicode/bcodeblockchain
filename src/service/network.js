import WebSocket, { WebSocketServer } from 'ws';

const { NETWORK_PORT = 5000, NODES } = process.env;
const nodes = NODES ? NODES.split(',') : [];
const MESSAGES = { BLOCKS: 'blocks' };

class NetworkService {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    };

    listen() {
        const server = new WebSocketServer({ port: NETWORK_PORT });
        server.on('connection', (socket) => this.onConnection(socket));

        nodes?.forEach(node => {
            const socket = new WebSocket(node);
            socket.on('open', () => this.onConnection(socket));
        });

        console.log(`Service ws:${NETWORK_PORT} reading...`);
    };

    onConnection(socket){
        const { blockchain } = this;

        console.log('[ws:socket] connected.');
        this.sockets.push(socket);

        socket.on('message', (message) => {
            const { type, value } = JSON.parse(message);

            console.log({ type, value });
        });

        socket.send(JSON.stringify({ type: MESSAGES.BLOCKS, value: blockchain.blocks }));
    };

    broadcast(type, value) {
        console.log(`[ws:broadcast] ${type}`);
        const message = JSON.stringify({ type: type, value: value });
        this.sockets?.forEach((socket) => socket.send(message));
    }
}

export default NetworkService;