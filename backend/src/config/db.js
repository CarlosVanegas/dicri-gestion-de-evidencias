// src/config/db.js
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT) || 1433,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool;

async function getPool() {
    if (pool) return pool;
    pool = await sql.connect(dbConfig);
    console.log('****Conectado a SQL Server****');
    return pool;
}

module.exports = { getPool, sql };
