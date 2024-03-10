const express = require('express');
const ServerPanel = express();
const path = require('path');


const Views = path.join(__dirname, 'ServerPanel', 'Views');
const publicPath = path.join(__dirname, 'ServerPanel', 'Public');

// Serving static files from the 'Public' directory
ServerPanel.use(express.static(publicPath));

ServerPanel.set('view engine', 'ejs');
ServerPanel.set('views', Views);


// Define routes
ServerPanel.get('/', (req, res) => {
    res.render( 'Main', { pageTitle: '2DRPGx Server Panel', message: 'Welcome to the server administration panel!' });
});

// Export the ServerPanel
module.exports = ServerPanel;