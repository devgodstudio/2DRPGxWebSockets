// GameManager.js
class GameManager {
    constructor() {
        this.connectionManager = null; // Initially null
        this.players = new Map(); // Maps WebSocket to player data
    }

    setConnectionManager(connectionManager) {
        this.connectionManager = connectionManager;
    }

    // Existing methods...
}

module.exports = GameManager;