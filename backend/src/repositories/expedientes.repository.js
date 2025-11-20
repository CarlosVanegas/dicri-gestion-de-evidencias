// src/repositories/expedientes.repository.js
const { getPool } = require('../config/db');

async function listarExpedientes() {
    const pool = await getPool();
    const result = await pool.request().execute('sp_expedientes_listar');
    return result.recordset;
}

async function obtenerExpedientePorId(id_expediente) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_expediente', id_expediente)
        .execute('sp_expedientes_obtener_por_id');

    if (result.recordset.length === 0) {
        return null;
    }

    return result.recordset[0];
}

async function crearExpediente({ codigo_expediente, titulo, descripcion, id_tecnico_registra, id_estado_actual }) {
    const pool = await getPool();
    const result = await pool.request()
        .input('codigo_expediente', codigo_expediente)
        .input('titulo', titulo ?? null)
        .input('descripcion', descripcion ?? null)
        .input('id_tecnico_registra', id_tecnico_registra)
        .input('id_estado_actual', id_estado_actual)
        .execute('sp_expedientes_crear');

    return result.recordset[0];
}

async function actualizarExpediente(id_expediente, { titulo, descripcion, id_estado_actual }) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_expediente', id_expediente)
        .input('titulo', titulo ?? null)
        .input('descripcion', descripcion ?? null)
        .input('id_estado_actual', id_estado_actual)
        .execute('sp_expedientes_actualizar');

    if (result.recordset.length === 0) {
        return null;
    }

    return result.recordset[0];
}

module.exports = {
    listarExpedientes,
    obtenerExpedientePorId,
    crearExpediente,
    actualizarExpediente,
};