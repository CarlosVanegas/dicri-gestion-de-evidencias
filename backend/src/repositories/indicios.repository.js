// src/repositories/indicios.repository.js
const sql = require('mssql');
const { pool } = require('../config/db');

async function crearIndicio({
                                id_expediente,
                                descripcion,
                                color,
                                tamano,
                                peso,
                                ubicacion,
                                id_tecnico_registra,
                            }) {
    const connection = await pool;
    const request = connection.request();

    request.input('id_expediente', sql.Int, id_expediente);
    request.input('descripcion', sql.VarChar(500), descripcion);
    request.input('color', sql.VarChar(100), color || null);
    request.input('tamano', sql.VarChar(100), tamano || null);
    request.input('peso', sql.Decimal(18, 2), peso || null);
    request.input('ubicacion', sql.VarChar(200), ubicacion || null);
    request.input('id_tecnico_registra', sql.Int, id_tecnico_registra);

    request.output('id_indicio_nuevo', sql.Int);

    const result = await request.execute('sp_InsertIndicio');

    const outputId = result.output.id_indicio_nuevo;
    return { id_indicio: outputId };
}

async function actualizarIndicio({
                                     id_indicio,
                                     descripcion,
                                     color,
                                     tamano,
                                     peso,
                                     ubicacion,
                                 }) {
    const connection = await pool;
    const request = connection.request();

    request.input('id_indicio', sql.Int, id_indicio);
    request.input('descripcion', sql.VarChar(500), descripcion);
    request.input('color', sql.VarChar(100), color || null);
    request.input('tamano', sql.VarChar(100), tamano || null);
    request.input('peso', sql.Decimal(18, 2), peso || null);
    request.input('ubicacion', sql.VarChar(200), ubicacion || null);

    await request.execute('sp_UpdateIndicio');
}

async function eliminarIndicio(id_indicio) {
    const connection = await pool;
    const request = connection.request();

    request.input('id_indicio', sql.Int, id_indicio);
    await request.execute('sp_DeleteIndicio');
}

async function obtenerIndicioPorId(id_indicio) {
    const connection = await pool;
    const request = connection.request();

    request.input('id_indicio', sql.Int, id_indicio);
    const result = await request.execute('sp_GetIndicioById');

    return result.recordset[0] || null;
}

async function obtenerIndiciosPorExpediente(id_expediente) {
    const connection = await pool;
    const request = connection.request();

    request.input('id_expediente', sql.Int, id_expediente);
    const result = await request.execute('sp_GetIndiciosByExpediente');

    return result.recordset;
}

module.exports = {
    crearIndicio,
    actualizarIndicio,
    eliminarIndicio,
    obtenerIndicioPorId,
    obtenerIndiciosPorExpediente,
};
