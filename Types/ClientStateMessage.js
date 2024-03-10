class ClientStateMessage{
    //this contains the client information, version, etc. including the ip and hwid
    constructor(version, ip, hwid){
        this.version = version;
        this.ip = ip;
        this.hwid = hwid;
    }
}