// src/services/expedientes.service.js
const expedientesRepo = require('../repositories/expedientes.repository');

async function listar() {
    return await expedientesRepo.listarExpedientes();
}

async function obtenerPorId(id_expediente) {
    return await expedientesRepo.obtenerExpedientePorId(id_expediente);
}

async function crear(datos) {
    // Aquí podrías validar campos si quieres
    return await expedientesRepo.crearExpediente(datos);
}

async function actualizar(id_expediente, datos) {
    // Primero verificamos que exista
    const existe = await expedientesRepo.obtenerExpedientePorId(id_expediente);
    if (!existe) {
        return null;
    }

    return await expedientesRepo.actualizarExpediente(id_expediente, datos);
}

module.exports = {
    listar,
    obtenerPorId,
    crear,
    actualizar,
};