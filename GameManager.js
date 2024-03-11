// Import necessary modules
const jwt = require('jsonwebtoken');
const ServerMessage = require("./Types/ServerMessage");
const { AccountStateMessage } = require("./Types/AccountStateMessage");
const { Validation } = require("./Validation");
require('dotenv').config();


//define players map
let players = new Map();
class GameManager {
    constructor() {
        this.connectionManager = null; // Initially null
        this.players = players;
    }

    setConnectionManager(connectionManager) {
        this.connectionManager = connectionManager;
    }

    async login(clientState) {
        if (!Validation.validateInput(clientState.Username) || !Validation.validateInput(clientState.Password)) {
            return new ServerMessage(null, "invalid_input", "Username and password must not be empty");
        }
        try {
            let user = await AccountStateMessage.getAccountStateByUsername(clientState.Username);
            //check if already online
            if (user && user.isonline === 1) {
                return new ServerMessage(null, "already_logged_in", "User is already online, please log out first. If you are not logged in, contact us for assistance.");
            }

            if (!user) {
                // If the user does not exist, create a new account automatically
                const hashedPassword = await Validation.hashPassword(clientState.Password);
                user = await AccountStateMessage.createAccountState(clientState.Username, hashedPassword);
                console.log(`Account created successfully. You may now login, ${clientState.Username}`);
                //send message to client
                return new ServerMessage(null, "account_created", "Account created successfully. You may now login");
            } else {
                // Compare the user password hash with the submitted password
                const isValidPassword = await Validation.validatePassword(clientState.Password, user.password);
                if (!isValidPassword) {
                    return new ServerMessage(null,"invalid_password", "Invalid password");
                }

                //Update user last login time
                await AccountStateMessage.updateLastLoginTime(clientState.Username, new Date()).then(() => {
                    console.log(`User ${clientState.Username} Last login time updated successfully`);
                });

                // Set the user to online
                await AccountStateMessage.updateOnlineStatus(clientState.Username, 1).then(() => {
                    console.log(`User ${clientState.Username} is now online`);
                });
            }
            // Generate JWT token
            const token = jwt.sign(
                {
                    username: clientState.Username,
                    user_id: user.User_ID,
                },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRATION }
            );

            // Add the user to the list of online users
            this.players.set(clientState.Username, { ...clientState, token });
            console.log(this.players);

            //debug something here all users online
            console.log("All users online: ", this.players);

            // Return the user's data with the token
            return new ServerMessage(token, "login_success", "You have successfully logged in");
        } catch (error) {
            console.error("An error occurred during login:", error);
            return new ServerMessage(null, "login_error", "An error occurred during login. Please try again later.");
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

    //All Other Methods require a valid token
    //===================================================================================================
    // Method

}

module.exports = GameManager;
