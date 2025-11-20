// src/routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Todas las rutas de usuarios requieren estar autenticado
router.use(authMiddleware);

// Lista de usuarios
router.get('/', usuariosController.getUsuarios);

// Usuario por id
router.get('/:id', usuariosController.getUsuarioById);

// Crear usuario
router.post('/', usuariosController.createUsuario);

// Actualizar usuario (sin password)
router.put('/:id', usuariosController.updateUsuario);

// Cambiar contraseña
router.patch('/:id/password', usuariosController.changePassword);

// Desactivar usuario
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
