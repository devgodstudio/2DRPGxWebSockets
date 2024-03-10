class ClientStateMessage{
    //this contains the client information, version, etc. including the ip and hwid
    constructor(Version, Ip, Hwid){
        this.Version = Version;
        this.Ip = Ip;
        this.Hwid = Hwid;
    }
}

module.exports = ClientStateMessage;