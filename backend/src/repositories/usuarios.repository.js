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

module.exports = {
    buscarUsuarioPorNombreUsuario
};
