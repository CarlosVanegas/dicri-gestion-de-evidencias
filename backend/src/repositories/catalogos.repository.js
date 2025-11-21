// src/repositories/catalogos.repository.js
const sql = require('mssql');
const { pool } = require('../config/db');

async function obtenerEstadosExpediente() {
    const connection = await pool;
    const request = connection.request();

    const result = await request.execute('sp_GetEstadosExpediente');
    return result.recordset;
}

module.exports = {
    obtenerEstadosExpediente,
};
