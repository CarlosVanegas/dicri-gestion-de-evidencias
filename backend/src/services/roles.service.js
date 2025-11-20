// src/services/roles.service.js
const AppError = require('../utils/appError');
const rolesRepo = require('../repositories/roles.repository');

function normalizarTexto(valor) {
    if (typeof valor !== 'string') return valor;
    const trimmed = valor.trim();
    return trimmed === '' ? null : trimmed;
}

async function obtenerTodos() {
    return await rolesRepo.listarRoles();
}

async function obtenerPorId(id) {
    const rol = await rolesRepo.obtenerRolPorId(id);
    if (!rol) {
        throw new AppError('Rol no encontrado', 404);
    }
    return rol;
}

async function crear(data) {
    let { nombre, descripcion, es_activo } = data;

    nombre = normalizarTexto(nombre);
    descripcion = normalizarTexto(descripcion);
    if (typeof es_activo === 'undefined' || es_activo === null) {
        es_activo = true;
    }

    if (!nombre) {
        throw new AppError('El nombre del rol es requerido', 400);
    }

    const nuevo = await rolesRepo.crearRol(nombre, descripcion, es_activo);
    return nuevo;
}

async function actualizar(id, data) {
    let { nombre, descripcion, es_activo } = data;

    nombre = normalizarTexto(nombre);
    descripcion = normalizarTexto(descripcion);

    if (typeof es_activo === 'undefined' || es_activo === null) {
        es_activo = true;
    } else {
        es_activo = Boolean(es_activo);
    }

    if (!nombre) {
        throw new AppError('El nombre del rol es requerido', 400);
    }

    const existente = await rolesRepo.obtenerRolPorId(id);
    if (!existente) {
        throw new AppError('Rol no encontrado', 404);
    }

    const actualizado = await rolesRepo.actualizarRol(
        id,
        nombre,
        descripcion,
        es_activo
    );

    return actualizado;
}

async function eliminar(id) {
    const existente = await rolesRepo.obtenerRolPorId(id);
    if (!existente) {
        throw new AppError('Rol no encontrado', 404);
    }

    await rolesRepo.desactivarRol(id);
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};