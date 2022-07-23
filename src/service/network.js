import WebSocket, { WebSocketServer } from 'ws';

const { NETWORK_PORT = 5000, NODES } = process.env;
const nodes = NODES ? NODES.split(',') : [];

class NetworkService {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.socket = [];
    };

    listen() {
        const server = new WebSocketServer({ port: NETWORK_PORT });
        server.on('connection', (socket) => this.onConnection(socket));

        nodes?.forEach(node => {
            console.log(`-node:${node}`);
            const socket = new WebSocket(node);
            socket.on('open', () => this.onConnection(socket));
        });

        console.log(`Service ws:${NETWORK_PORT} reading...`);
    };

    onConnection(socket){
        console.log('ws:socket connected.');
        this.socket.push(socket);
    };
}

export default NetworkService;