class AccountStateMessage{
    constructor(authtoken, user_id, username, password, isonline, last_login_time){
        this.authtoken = authtoken;
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.isonline = isonline;
        this.last_login_time = last_login_time;
    }
}