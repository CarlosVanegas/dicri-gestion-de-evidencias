// src/repositories/usuarios.repository.js
const { getPool } = require('../config/db');

async function buscarUsuarioPorNombreUsuario(usuario) {
    const pool = await getPool();

    const result = await pool.request()
        .input('usuario', usuario)
        .execute('sp_usuarios_login');

    if (result.recordset.length === 0) {
        return null;
    }

    return result.recordset[0];
}

async function listarUsuarios() {
    const pool = await getPool();
    const result = await pool.request().execute('sp_usuarios_listar');
    return result.recordset;
}

async function obtenerUsuarioPorId(id_usuario) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .execute('sp_usuarios_obtener_por_id');

    if (result.recordset.length === 0) {
        return null;
    }

    return result.recordset[0];
}

async function obtenerUsuarioResumenPorUsuario(usuario) {
    const pool = await getPool();
    const result = await pool.request()
        .input('usuario', usuario)
        .execute('sp_usuarios_obtener_por_usuario');

    if (result.recordset.length === 0) {
        return null;
    }

    return result.recordset[0];
}

async function crearUsuario({ nombre_completo, usuario, email, password_hash, id_rol, activo = true }) {
    const pool = await getPool();
    const result = await pool.request()
        .input('nombre_completo', nombre_completo)
        .input('usuario', usuario)
        .input('email', email)
        .input('password_hash', password_hash)
        .input('id_rol', id_rol)
        .input('activo', activo)
        .execute('sp_usuarios_crear');

    return result.recordset[0];
}

async function actualizarUsuario({ id_usuario, nombre_completo, usuario, email, id_rol, activo }) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .input('nombre_completo', nombre_completo)
        .input('usuario', usuario)
        .input('email', email)
        .input('id_rol', id_rol)
        .input('activo', activo)
        .execute('sp_usuarios_actualizar');

    if (result.recordset.length === 0) {
        return null;
    }

    return result.recordset[0];
}

async function cambiarPassword(id_usuario, password_hash) {
    const pool = await getPool();
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .input('password_hash', password_hash)
        .execute('sp_usuarios_cambiar_password');

    if (result.recordset.length === 0) {
        return null;
    }   

    return result.recordset[0];
}

async function desactivarUsuario(id_usuario) {
    const pool = await getPool();
    await pool.request()
        .input('id_usuario', id_usuario)
        .execute('sp_usuarios_desactivar');
}

module.exports = {
    buscarUsuarioPorNombreUsuario,
    listarUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuarioResumenPorUsuario,
    crearUsuario,
    actualizarUsuario,
    cambiarPassword,
    desactivarUsuario
};
