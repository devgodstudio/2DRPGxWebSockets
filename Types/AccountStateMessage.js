//require database
const DatabaseConnection = require('../DatabaseConnection');

class AccountStateMessage {
    constructor(AuthToken, User_ID, Username, Password, IsOnline, Last_Login_Time) {
        this.AuthToken = AuthToken;
        this.User_ID = User_ID;
        this.Username = Username;
        this.Password = Password;
        this.IsOnline = IsOnline;
        this.Last_Login_Time = Last_Login_Time;
    }

    static getAccountState(Username, Password) {
        return DatabaseConnection.executeQuerySingle("SELECT * FROM users WHERE username = ? AND password = ?", [Username, Password]);
    }

    static getAccountStateByUsername(Username) {
        return DatabaseConnection.executeQuerySingle("SELECT * FROM users WHERE username = ?", [Username]);
    }

    static setAccountState(Username, Password, IsOnline, Last_Login_Time) {
        return DatabaseConnection.executeQuery("UPDATE users SET IsOnline = ?, Last_Login_Time = ? WHERE Username = ?", [IsOnline, Last_Login_Time, Username]);
    }

    static createAccountState(Username, Password) {
        return DatabaseConnection.executeQuery("INSERT INTO users (username, password, isonline, last_login_time) VALUES (?, ?, ?, ?)", [Username, Password, false, new Date()]);
    }

    static deleteAccountState(Username) {
        return DatabaseConnection.executeQuery("DELETE FROM users WHERE Username = ?", [Username]);
    }

    static getAllAccountStates() {
        return DatabaseConnection.executeQuery("SELECT * FROM users");
    }

    static deleteAllAccountStates() {
        return DatabaseConnection.executeQuery("DELETE FROM users");
    }

    static setAllAccountStates(Password, IsOnline, Last_Login_Time) {
        return DatabaseConnection.executeQuery("UPDATE users SET Password = ?, IsOnline = ?, Last_Login_Time = ?", [Password, IsOnline, Last_Login_Time]);
        return DatabaseConnection.executeQuery("UPDATE users SET Password = ?, IsOnline = ?, Last_Login_Time = ?", [Password, IsOnline, Last_Login_Time]);
    }

    static createAllAccountStates(Username, Password) {
        return DatabaseConnection.executeQuery("INSERT INTO users (Username, Password, IsOnline, Last_Login_Time) VALUES (?, ?, ?, ?)", [Username, Password, false, new Date()]);
    }

    static isUserOnline(Username) {
        return DatabaseConnection.executeQuerySingle("SELECT isonline FROM users WHERE Username = ?", [Username]);
    }
}

module.exports = {
    AccountStateMessage,
    DatabaseConnection,
}