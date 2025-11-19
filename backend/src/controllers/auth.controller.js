// src/controllers/auth.controller.js
const AppError = require('../utils/appError');
const authService = require('../services/auth.service');

async function login(req, res, next) {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            throw new AppError('usuario y password son requeridos', 400);
        }

        const resultado = await authService.login(usuario, password);

        res.json({
            ok: true,
            message: 'Login exitoso',
            ...resultado
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login
};
