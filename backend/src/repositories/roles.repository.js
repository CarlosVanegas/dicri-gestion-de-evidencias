// src/repositories/roles.repository.js
const { getPool } = require('../config/db');

async function listarRoles() {
    const pool = await getPool();
    const result = await pool.request().execute('sp_roles_listar');
    return result.recordset;
}

async function obtenerRolPorId(id_rol) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_rol', id_rol)
        .execute('sp_roles_obtener_por_id');

    if (result.recordset.length === 0) {
        return null;
    }
    return result.recordset[0];
}

async function crearRol(nombre, descripcion, es_activo = true) {
    const pool = await getPool();
    const result = await pool.request()
        .input('nombre', nombre)
        .input('descripcion', descripcion)
        .input('es_activo', es_activo)
        .execute('sp_roles_crear');

    return result.recordset[0];
}

async function actualizarRol(id_rol, nombre, descripcion, es_activo) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_rol', id_rol)
        .input('nombre', nombre)
        .input('descripcion', descripcion)
        .input('es_activo', es_activo)
        .execute('sp_roles_actualizar');

    if (result.recordset.length === 0) {
        return null;
    }
    return result.recordset[0];
}

async function desactivarRol(id_rol) {
    const pool = await getPool();
    await pool.request()
        .input('id_rol', id_rol)
        .execute('sp_roles_eliminar'); // en realidad desactiva (es_activo = 0)
}

module.exports = {
    listarRoles,
    obtenerRolPorId,
    crearRol,
    actualizarRol,
    desactivarRol
};
