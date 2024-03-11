class ServerMessage{
    constructor(AuthToken, Message, Data){
        this.AuthToken = AuthToken; // null at first once the user authenticates, the token is how the server knows the user is authenticated and who they are
        this.Message = Message;
        this.Data = Data;
    }
}

module.exports = ServerMessage;