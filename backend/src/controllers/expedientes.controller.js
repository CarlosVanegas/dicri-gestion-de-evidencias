// src/controllers/expedientes.controller.js
const expedientesService = require('../services/expedientes.service');

async function getExpedientes(req, res, next) {
    try {
        const data = await expedientesService.listar();
        res.json({ ok: true, data });
    } catch (err) {
        next(err);
    }
}

async function getExpedienteById(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        const expediente = await expedientesService.obtenerPorId(id);

        if (!expediente) {
            return res.status(404).json({
                ok: false,
                message: 'Expediente no encontrado',
            });
        }

        res.json({ ok: true, data: expediente });
    } catch (err) {
        next(err);
    }
}

async function createExpediente(req, res, next) {
    try {
        const { codigo_expediente, titulo, descripcion, id_tecnico_registra, id_estado_actual } = req.body;

        // Podrías validar que vengan obligatorios: codigo_expediente, id_tecnico_registra, id_estado_actual
        const nuevo = await expedientesService.crear({
            codigo_expediente,
            titulo,
            descripcion,
            id_tecnico_registra,
            id_estado_actual,
        });

        res.status(201).json({
            ok: true,
            data: nuevo,
        });
    } catch (err) {
        next(err);
    }
}

async function updateExpediente(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        const { titulo, descripcion, id_estado_actual } = req.body;

        const actualizado = await expedientesService.actualizar(id, {
            titulo,
            descripcion,
            id_estado_actual,
        });

        if (!actualizado) {
            return res.status(404).json({
                ok: false,
                message: 'Expediente no encontrado',
            });
        }

        res.json({
            ok: true,
            data: actualizado,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getExpedientes,
    getExpedienteById,
    createExpediente,
    updateExpediente,
};