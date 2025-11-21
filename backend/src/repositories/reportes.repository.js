// src/repositories/reportes.repository.js
const sql = require('mssql');
const { pool } = require('../config/db');

async function reporteExpedientes({ fecha_desde = null, fecha_hasta = null, id_estado = null }) {
    const connection = await pool;
    const request = connection.request();

    request.input('fecha_desde', sql.Date, fecha_desde);
    request.input('fecha_hasta', sql.Date, fecha_hasta);
    request.input('id_estado', sql.Int, id_estado);

    const result = await request.execute('sp_ReporteExpedientes');
    return result.recordset;
}

async function reporteEstadisticas({ fecha_desde = null, fecha_hasta = null }) {
    const connection = await pool;
    const request = connection.request();

    request.input('fecha_desde', sql.Date, fecha_desde);
    request.input('fecha_hasta', sql.Date, fecha_hasta);

    const result = await request.execute('sp_ReporteEstadisticasExpedientes');
    return result.recordset;
}

module.exports = {
    reporteExpedientes,
    reporteEstadisticas,
};
