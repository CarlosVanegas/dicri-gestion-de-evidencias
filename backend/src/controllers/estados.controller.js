// src/controllers/estados.controller.js
const estadosService = require('../services/estados.service');

async function getEstados(req, res, next) {
    try {
        const estados = await estadosService.obtenerTodos();
        res.json({
            ok: true,
            data: estados
        });
    } catch (err) {
        next(err);
    }
}

async function getEstadoById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const estado = await estadosService.obtenerPorId(id);
        res.json({
            ok: true,
            data: estado
        });
    } catch (err) {
        next(err);
    }
}

async function createEstado(req, res, next) {
    try {
        const nuevo = await estadosService.crear(req.body);
        res.status(201).json({
            ok: true,
            message: 'Estado creado correctamente',
            data: nuevo
        });
    } catch (err) {
        next(err);
    }
}

async function updateEstado(req, res, next) {
    try {
        const id = Number(req.params.id);
        const actualizado = await estadosService.actualizar(id, req.body);
        res.json({
            ok: true,
            message: 'Estado actualizado correctamente',
            data: actualizado
        });
    } catch (err) {
        next(err);
    }
}

async function deleteEstado(req, res, next) {
    try {
        const id = Number(req.params.id);
        await estadosService.eliminar(id);
        res.json({
            ok: true,
            message: 'Estado eliminado correctamente'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getEstados,
    getEstadoById,
    createEstado,
    updateEstado,
    deleteEstado
};