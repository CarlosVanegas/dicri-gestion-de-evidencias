// src/services/estados.service.js
const AppError = require('../utils/appError');
const estadosRepo = require('../repositories/estados.repository');

function normalizarTexto(valor) {
    if (typeof valor !== 'string') return valor;
    const trimmed = valor.trim();
    return trimmed === '' ? null : trimmed;
}

async function obtenerTodos() {
    return await estadosRepo.listarEstados();
}

async function obtenerPorId(id) {
    const estado = await estadosRepo.obtenerEstadoPorId(id);
    if (!estado) {
        throw new AppError('Estado no encontrado', 404);
    }
    return estado;
}

async function crear(data) {
    let { codigo, descripcion } = data;

    codigo = normalizarTexto(codigo);
    descripcion = normalizarTexto(descripcion);

    if (!codigo || !descripcion) {
        throw new AppError('codigo y descripcion son requeridos', 400);
    }

    // Opcional: validar si ya existe el código
    const existente = await estadosRepo.obtenerEstadoPorCodigo(codigo);
    if (existente) {
        throw new AppError('Ya existe un estado con ese código', 409);
    }

    return await estadosRepo.crearEstado(codigo, descripcion);
}

async function actualizar(id, data) {
    let { codigo, descripcion } = data;

    codigo = normalizarTexto(codigo);
    descripcion = normalizarTexto(descripcion);

    if (!codigo || !descripcion) {
        throw new AppError('codigo y descripcion son requeridos', 400);
    }

    const existente = await estadosRepo.obtenerEstadoPorId(id);
    if (!existente) {
        throw new AppError('Estado no encontrado', 404);
    }

    // Si cambia el código, validar que no esté repetido
    if (codigo !== existente.codigo) {
        const conMismoCodigo = await estadosRepo.obtenerEstadoPorCodigo(codigo);
        if (conMismoCodigo) {
            throw new AppError('Ya existe un estado con ese código', 409);
        }
    }

    return await estadosRepo.actualizarEstado(id, codigo, descripcion);
}

async function eliminar(id) {
    const existente = await estadosRepo.obtenerEstadoPorId(id);
    if (!existente) {
        throw new AppError('Estado no encontrado', 404);
    }

    await estadosRepo.eliminarEstado(id);
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};