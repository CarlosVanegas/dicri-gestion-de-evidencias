// src/services/usuarios.service.js
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const usuariosRepo = require('../repositories/usuarios.repository');

function normalizarTexto(valor) {
    if (typeof valor !== 'string') return valor;
    const trimmed = valor.trim();
    return trimmed === '' ? null : trimmed;
}

async function obtenerTodos() {
    return await usuariosRepo.listarUsuarios();
}

async function obtenerPorId(id) {
    const usuario = await usuariosRepo.obtenerUsuarioPorId(id);
    if (!usuario) {
        throw new AppError('Usuario no encontrado', 404);
    }
    return usuario;
}

async function crear(data) {
    let { nombre_completo, usuario, email, password, id_rol, activo } = data;

    nombre_completo = normalizarTexto(nombre_completo);
    usuario = normalizarTexto(usuario);
    email = normalizarTexto(email);

    if (!nombre_completo || !usuario || !password || !id_rol) {
        throw new AppError('nombre_completo, usuario, password e id_rol son requeridos', 400);
    }

    // Validar que no exista el usuario
    const existente = await usuariosRepo.obtenerUsuarioResumenPorUsuario(usuario);
    if (existente) {
        throw new AppError('Ya existe un usuario con ese nombre de usuario', 409);
    }

    if (typeof activo === 'undefined' || activo === null) {
        activo = true;
    } else {
        activo = Boolean(activo);
    }

    const password_hash = await bcrypt.hash(password, 10);

    const creado = await usuariosRepo.crearUsuario({
        nombre_completo,
        usuario,
        email,
        password_hash,
        id_rol,
        activo
    });

    return creado;
}

async function actualizar(id, data) {
    let { nombre_completo, usuario, email, id_rol, activo } = data;

    nombre_completo = normalizarTexto(nombre_completo);
    usuario = normalizarTexto(usuario);
    email = normalizarTexto(email);

    if (!nombre_completo || !usuario || !id_rol) {
        throw new AppError('nombre_completo, usuario e id_rol son requeridos', 400);
    }

    const existente = await usuariosRepo.obtenerUsuarioPorId(id);
    if (!existente) {
        throw new AppError('Usuario no encontrado', 404);
    }

    // Si se cambia el nombre de usuario, validar que no esté ocupado
    if (usuario !== existente.usuario) {
        const otro = await usuariosRepo.obtenerUsuarioResumenPorUsuario(usuario);
        if (otro) {
            throw new AppError('Ya existe otro usuario con ese nombre de usuario', 409);
        }
    }

    if (typeof activo === 'undefined' || activo === null) {
        activo = existente.activo;
    } else {
        activo = Boolean(activo);
    }

    const actualizado = await usuariosRepo.actualizarUsuario({
        id_usuario: id,
        nombre_completo,
        usuario,
        email,
        id_rol,
        activo
    });

    return actualizado;
}

async function cambiarPassword(id, nuevaPassword) {
    if (!nuevaPassword || typeof nuevaPassword !== 'string' || nuevaPassword.trim() === '') {
        throw new AppError('La nueva contraseña es requerida', 400);
    }

    const existente = await usuariosRepo.obtenerUsuarioPorId(id);
    if (!existente) {
        throw new AppError('Usuario no encontrado', 404);
    }

    const password_hash = await bcrypt.hash(nuevaPassword, 10);
    await usuariosRepo.cambiarPassword(id, password_hash);
}

async function eliminar(id) {
    const existente = await usuariosRepo.obtenerUsuarioPorId(id);
    if (!existente) {
        throw new AppError('Usuario no encontrado', 404);
    }

    await usuariosRepo.desactivarUsuario(id);
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    cambiarPassword,
    eliminar
};