const http = require('http');
require('dotenv').config();

// Require your Express app from ServerPanel.js
const ServerPanel = require('./ServerPanel');

// Create the HTTP server using the Express app
const server = http.createServer(ServerPanel);

// Import ConnectionManager and GameManager
const ConnectionManager = require('./ConnectionManager');
const GameManager = require('./GameManager');

// Create an instance of GameManager
const gameManager = new GameManager();

// Pass the server and the gameManager instance to the ConnectionManager
const connectionManager = new ConnectionManager(server, gameManager);

// Optionally, set ConnectionManager reference in GameManager if needed
gameManager.setConnectionManager(connectionManager);
server.listen(process.env.PORT, () => {
    console.log(`${process.env.PROJECT_NAME} Server running at port ${process.env.PORT}`);
});

// This module now exports the server if needed elsewhere
module.exports = {
    server
}