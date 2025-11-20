// src/repositories/estados.repository.js
const { getPool } = require('../config/db');

async function listarEstados() {
    const pool = await getPool();
    const result = await pool.request().execute('sp_estados_listar');
    return result.recordset;
}

async function obtenerEstadoPorId(id_estado) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_estado', id_estado)
        .execute('sp_estados_obtener_por_id');

    if (result.recordset.length === 0) {
        return null;
    }
    return result.recordset[0];
}

async function obtenerEstadoPorCodigo(codigo) {
    const pool = await getPool();
    const result = await pool.request()
        .input('codigo', codigo)
        .execute('sp_estados_obtener_por_codigo');

    if (result.recordset.length === 0) {
        return null;
    }
    return result.recordset[0];
}

async function crearEstado(codigo, descripcion) {
    const pool = await getPool();
    const result = await pool.request()
        .input('codigo', codigo)
        .input('descripcion', descripcion)
        .execute('sp_estados_crear');

    return result.recordset[0];
}

async function actualizarEstado(id_estado, codigo, descripcion) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_estado', id_estado)
        .input('codigo', codigo)
        .input('descripcion', descripcion)
        .execute('sp_estados_actualizar');

    if (result.recordset.length === 0) {
        return null;
    }
    return result.recordset[0];
}

async function eliminarEstado(id_estado) {
    const pool = await getPool();
    await pool.request()
        .input('id_estado', id_estado)
        .execute('sp_estados_eliminar');
}

module.exports = {
    listarEstados,
    obtenerEstadoPorId,
    obtenerEstadoPorCodigo,
    crearEstado,
    actualizarEstado,
    eliminarEstado
};