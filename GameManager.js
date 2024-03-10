// Import necessary modules
const jwt = require('jsonwebtoken');
const ServerMessage = require("./Types/ServerMessage");
const { AccountStateMessage } = require("./Types/AccountStateMessage");
const { Validation } = require("./Validation");

class GameManager {
    constructor() {
        this.connectionManager = null; // Initially null
        this.players = new Map(); // Maps WebSocket to player data
    }

    setConnectionManager(connectionManager) {
        this.connectionManager = connectionManager;
    }

    async login(clientState) {
        if (!Validation.validateInput(clientState.Username) || !Validation.validateInput(clientState.Password)) {
            return new ServerMessage("invalid_input", "Username and password must not be empty");
        }
        try {
            let user = await AccountStateMessage.getAccountStateByUsername(clientState.Username);

            if (!user) {
                // If the user does not exist, create a new account automatically
                const hashedPassword = await Validation.hashPassword(clientState.Password);
                user = await AccountStateMessage.createAccountState(clientState.Username, hashedPassword);
                console.log("Account created successfully. You may now login.");
                // Note: You might want to return here or ask the user to log in again to confirm their credentials
            } else {
                // Compare the user password hash with the submitted password
                const isValidPassword = await Validation.validatePassword(clientState.Password, user.password);
                if (!isValidPassword) {
                    return new ServerMessage("invalid_password", "Invalid password");
                }

                // Check if the user is already online
                const isOnline = await AccountStateMessage.isUserOnline(clientState.Username);
                if (isOnline) {
                    return new ServerMessage("already_logged_in", "You are already logged in from another device, please log out first. If you believe this is an error, please contact support.");
                }
            }

            // Set the user as online
            await AccountStateMessage.setAccountState(user.AuthToken, user.User_ID, user.Username, clientState.Password, true, new Date());

            // Generate JWT token
            const token = jwt.sign(
                {
                    username: clientState.Username,
                    user_id: user.User_ID,
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRATION }
            );

            // Add the user to the list of online users
            this.players.set(clientState.Username, { ...clientState, token });
            console.log(this.players);

            // Return the user's data with the token
            return new ServerMessage("login_success", { user, token });
        } catch (error) {
            console.error("An error occurred during login:", error);
            return new ServerMessage("login_error", "An error occurred during the login process.");
        }
    }

    // Method to verify the token (to be used for subsequent WebSocket messages)
    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return { valid: true, decoded };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    }
}

module.exports = GameManager;
