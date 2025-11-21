// src/controllers/auth.controller.js
const AppError = require('../utils/appError');
const authService = require('../services/auth.service');

async function login(req, res) {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
        }

        const result = await authService.login(usuario, password);

        if (!result.ok) {
            return res.status(401).json({ message: result.error });
        }

        return res.json({
            message: 'Login exitoso',
            token: result.token,
            user: result.user,
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

async function profile(req, res) {
    try {
        res.json({
            user: req.user,
        });
    } catch (error) {
        console.error('Error en profile:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

module.exports = {
    login,profile
};
