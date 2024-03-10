class ServerMessage{
    constructor(Token, Message, Data){
        this.Token = Token; // null at first once the user authenticates, the token is how the server knows the user is authenticated and who they are
        this.Message = Message;
        this.Data = Data;
    }
}

module.exports = ServerMessage;