// src/services/auth.service.js
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const { generarToken } = require('../utils/jwt');
const { buscarUsuarioPorNombreUsuario } = require('../repositories/usuarios.repository');
const jwt = require('jsonwebtoken');
const usuariosRepo = require('../repositories/usuarios.repository');

const JWT_SECRET = process.env.JWT_SECRET || 'a43e23499369712020e6624edb5057eada562d478cf80747177adfeae82d6ca4';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

/*async function login(usuario, passwordPlano) {
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
}*/


async function login(usuario, password_plano) {
    const user = await usuariosRepo.obtenerUsuarioPorUsuario(usuario);

    if (!user) {
        return { ok: false, error: 'Usuario o contraseña incorrectos' };
    }

    if (user.activo === 0) {
        return { ok: false, error: 'Usuario inactivo' };
    }

    const passwordValido = await bcrypt.compare(password_plano, user.password_hash);

    if (!passwordValido) {
        return { ok: false, error: 'Usuario o contraseña incorrectos' };
    }

    const payload = {
        id_usuario: user.id_usuario,
        usuario: user.usuario,
        nombre_completo: user.nombre_completo,
        id_rol: user.id_rol,
        rol: user.rol_nombre,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {
        ok: true,
        token,
        user: payload,
    };
}

module.exports = {
    login
};
