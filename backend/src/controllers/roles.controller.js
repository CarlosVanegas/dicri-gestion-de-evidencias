// src/controllers/roles.controller.js
const rolesService = require('../services/roles.service');

async function getRoles(req, res, next) {
    try {
        const roles = await rolesService.obtenerTodos();
        res.json({
            ok: true,
            data: roles
        });
    } catch (err) {
        next(err);
    }
}

async function getRolById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const rol = await rolesService.obtenerPorId(id);
        res.json({
            ok: true,
            data: rol
        });
    } catch (err) {
        next(err);
    }
}

async function createRol(req, res, next) {
    try {
        const nuevo = await rolesService.crear(req.body);
        res.status(201).json({
            ok: true,
            message: 'Rol creado correctamente',
            data: nuevo
        });
    } catch (err) {
        next(err);
    }
}

async function updateRol(req, res, next) {
    try {
        const id = Number(req.params.id);
        const actualizado = await rolesService.actualizar(id, req.body);
        res.json({
            ok: true,
            message: 'Rol actualizado correctamente',
            data: actualizado
        });
    } catch (err) {
        next(err);
    }
}

async function deleteRol(req, res, next) {
    try {
        const id = Number(req.params.id);
        await rolesService.eliminar(id);
        res.json({
            ok: true,
            message: 'Rol desactivado correctamente'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getRoles,
    getRolById,
    createRol,
    updateRol,
    deleteRol
};
