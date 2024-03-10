
const mysql2 = require('mysql2/promise');
require('dotenv').config();

// Create a pool of connections
const pool = mysql2.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const executeQuery = async (query, params) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(query, params);
        return rows;
    } catch (error) {
        throw error; // or handle it as per your error handling strategy
    } finally {
        if (connection) connection.release();
    }
};

const executeQuerySingle = async (query, params) => {
    const rows = await executeQuery(query, params);
    return rows[0];
};

module.exports = {
    executeQuery,
    executeQuerySingle
};