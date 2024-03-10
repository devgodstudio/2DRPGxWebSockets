// server.js
const http = require('http');
const ConnectionManager = require('./ConnectionManager');
const GameManager = require('./GameManager');
const ServerPanel = require('./ServerPanel');
require('dotenv').config();

const server = http.createServer((req, res) => {
    const serverPanel = new ServerPanel(req, res);
    serverPanel.renderPanel();
});

// Create an instance of GameManager
const gameManager = new GameManager();

// Pass the server and the gameManager instance to the ConnectionManager
const connectionManager = new ConnectionManager(server, gameManager);

// Optionally, if GameManager needs a reference back to ConnectionManager, you can set it here
gameManager.setConnectionManager(connectionManager);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(process.env.PROJECT_NAME + ` Server running at port ${PORT}`);
});
