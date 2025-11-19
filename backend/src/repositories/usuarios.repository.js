// src/repositories/usuarios.repository.js
const { getPool } = require('../config/db');

async function buscarUsuarioPorNombreUsuario(usuario) {
    const pool = await getPool();

    const result = await pool.request()
        .input('usuario', usuario)
        .query(`
              SELECT 
                id_usuario,
                nombre_completo,
                usuario,
                email,
                password_hash,
                id_rol,
                activo
              FROM usuarios
              WHERE usuario = @usuario
            `);

    // Si no hay registros, devolvemos null
    if (result.recordset.length === 0) {
        return null;
    }

    return result.recordset[0];
}

module.exports = {
    buscarUsuarioPorNombreUsuario
};