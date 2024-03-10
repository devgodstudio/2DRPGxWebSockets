const express = require('express');
const session = require('express-session');
const ServerPanel = express();
const path = require('path');

// Setup session
ServerPanel.use(session({
    secret: 'your_secret_key', // Change this to a unique secret for your app
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // for HTTP; set to true if using HTTPS
}));

const Views = path.join(__dirname, 'ServerPanel', 'Views');
const publicPath = path.join(__dirname, 'ServerPanel', 'Public');

// Serving static files from the 'Public' directory
ServerPanel.use(express.static(publicPath));

ServerPanel.set('view engine', 'ejs');
ServerPanel.set('views', Views);

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    }
    // Redirect to login if not authenticated
    res.redirect('/login');
}

// Define protected route
ServerPanel.get('/', isAuthenticated, (req, res) => {
    res.render('Main', { pageTitle: '2DRPGx Server Panel', message: 'Welcome to the server administration panel!',
    isAuthenticated: req.session.isAuthenticated});
});

// Login page route
ServerPanel.get('/login', (req, res) => {
    // Assuming you have a 'Login.ejs' view to render
    res.render('Login', { pageTitle: 'Login', isAuthenticated: req.session.isAuthenticated});
});

// Login logic
ServerPanel.post('/login', express.urlencoded({ extended: true }), (req, res) => {
    // Here, implement your user authentication logic
    // For demonstration, using hardcoded credentials:
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') { // Replace with your actual validation logic
        req.session.isAuthenticated = true;
        res.redirect('/');
    } else {
        // Optional: Pass an error message to the login page for feedback
        res.render('Login', { pageTitle: 'Login', error: 'Invalid credentials.' });
    }
});

// Logout route
ServerPanel.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/'); // Redirect to home page or error page
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.redirect('/login');
    });
});

// Export the ServerPanel
module.exports = ServerPanel;
