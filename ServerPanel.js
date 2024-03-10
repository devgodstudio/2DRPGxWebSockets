//Set headers for the server

class ServerPanel {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    renderPanel() {
        this.res.writeHead(200, { 'Content-Type': 'text/html' });
        this.res.write('<h1>Server Panel</h1>');
        this.res.end();
    }
}

module.exports = ServerPanel;