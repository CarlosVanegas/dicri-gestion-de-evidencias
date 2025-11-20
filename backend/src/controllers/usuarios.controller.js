// src/controllers/usuarios.controller.js
const usuariosService = require('../services/usuarios.service');

async function getUsuarios(req, res, next) {
    try {
        const usuarios = await usuariosService.obtenerTodos();
        res.json({
            ok: true,
            data: usuarios
        });
    } catch (err) {
        next(err);
    }
}

async function getUsuarioById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const usuario = await usuariosService.obtenerPorId(id);
        res.json({
            ok: true,
            data: usuario
        });
    } catch (err) {
        next(err);
    }
}

async function createUsuario(req, res, next) {
    try {
        const creado = await usuariosService.crear(req.body);
        res.status(201).json({
            ok: true,
            message: 'Usuario creado correctamente',
            data: creado
        });
    } catch (err) {
        next(err);
    }
}

async function updateUsuario(req, res, next) {
    try {
        const id = Number(req.params.id);
        const actualizado = await usuariosService.actualizar(id, req.body);
        res.json({
            ok: true,
            message: 'Usuario actualizado correctamente',
            data: actualizado
        });
    } catch (err) {
        next(err);
    }
}

async function changePassword(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { nuevaPassword } = req.body;
        await usuariosService.cambiarPassword(id, nuevaPassword);
        res.json({
            ok: true,
            message: 'Contraseña actualizada correctamente'
        });
    } catch (err) {
        next(err);
    }
}

async function deleteUsuario(req, res, next) {
    try {
        const id = Number(req.params.id);
        await usuariosService.eliminar(id);
        res.json({
            ok: true,
            message: 'Usuario desactivado correctamente'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    changePassword,
    deleteUsuario
};
