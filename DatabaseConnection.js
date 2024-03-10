const mysql2 = require('mysql2');
require('dotenv').config();

// Corrected the syntax for creating a pool
const databaseConnection = mysql2.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

module.exports = databaseConnection;