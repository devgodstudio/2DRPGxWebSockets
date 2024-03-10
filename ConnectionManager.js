const WebSocket = require('ws');

class ConnectionManager {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Set();

        this.wss.on('connection', (ws) => {
            this.onConnection(ws);
        });
    }

    onConnection(ws) {

        console.log('A client connected');
        this.clients.add(ws);

        ws.on('message', (message) => {
            console.log(`Received message: ${message}`);
            // Delegate message handling to game logic here, e.g., this.gameManager.handleMessage(ws, message);
        });

        ws.on('close', () => {
            console.log('A user disconnected');
            this.clients.delete(ws);
        });
    }

    broadcast(message) {
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

module.exports = ConnectionManager;