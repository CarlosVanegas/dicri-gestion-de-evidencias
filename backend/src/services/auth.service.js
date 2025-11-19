// src/services/auth.service.js
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const { generarToken } = require('../utils/jwt');
const { buscarUsuarioPorNombreUsuario } = require('../repositories/usuarios.repository');

async function login(usuario, passwordPlano) {
    // 1. Buscar usuario en BD
    const user = await buscarUsuarioPorNombreUsuario(usuario);

    if (!user) {
        throw new AppError('Credenciales inválidas', 401);
    }

    if (user.activo === false || user.activo === 0) {
        throw new AppError('Usuario inactivo', 403);
    }

    // 2. Comparar password
    const passwordCorrecto = await bcrypt.compare(passwordPlano, user.password_hash);
    if (!passwordCorrecto) {
        throw new AppError('Credenciales inválidas', 401);
    }

    // 3. Armar payload del token
    const payload = {
        id_usuario: user.id_usuario,
        id_rol: user.id_rol,
        nombre: user.nombre_completo
    };

    const token = generarToken(payload);

    // 4. Devolver datos que usará el frontend
    return {
        token,
        usuario: {
            id_usuario: user.id_usuario,
            nombre: user.nombre_completo,
            usuario: user.usuario,
            email: user.email,
            id_rol: user.id_rol
        }
    };
}

module.exports = {
    login
};
