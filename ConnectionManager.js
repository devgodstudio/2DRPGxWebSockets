const WebSocket = require('ws');
const ServerMessage = require('./Types/ServerMessage');
const GameManager = require('./GameManager');

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

        ws.on('message', async (msg) => {
            const receivedMsg = JSON.parse(msg);
            switch (receivedMsg.Message) {
                case "validate_game":
                    const clientState = JSON.parse(receivedMsg.Data); // Assuming Data is a JSON string of ClientStateMessage
                    if (clientState.Version !== parseInt(process.env.GAME_VERSION)) {
                        const error = new ServerMessage(null,"invalid_game_version", "Your game version is outdated. Please update your game to the latest version.");
                        ws.send(JSON.stringify(error));
                    } else {
                        const success = new ServerMessage(null, "valid_game_version", "Your game version is up to date, you may now login.");
                        ws.send(JSON.stringify(success));
                    }
                    break;
                // Inside an async function
                case "login_request": {
                    const clientState = JSON.parse(receivedMsg.Data); // Assuming Data is a JSON string of ClientStateMessage
                    const gameManager = new GameManager();
                    const loginResponse = await gameManager.login(clientState); // Await the promise
                    ws.send(JSON.stringify(loginResponse));
                    break; // Assuming this is within a switch-cas
                }
                default:
                    const error = new ServerMessage(null,"Error", "You have made an invalid request!");
                    ws.send(JSON.stringify(error));
                    break;
            }
        });

        ws.on('close', () => {

            console.log('A client disconnected');
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