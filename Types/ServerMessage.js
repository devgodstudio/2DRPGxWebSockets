class ServerMessage{
    constructor(user_id, message, data){

        //this can either be the user id or the character id since we want to keep this in one class and in one variable
        this.user_id = user_id; //this is the user id that will be used to send the message to the client
        this.message = message; //this is the message that will be sent to the client
        this.data = data; //this is the class that will be used to send data to the client
    }
}