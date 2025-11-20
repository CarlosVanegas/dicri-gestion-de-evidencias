// src/routes/usuarios.routes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Todas las rutas de usuarios requieren estar autenticado
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', usuariosController.getUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', usuariosController.getUsuarioById);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_completo
 *               - usuario
 *               - password
 *               - id_rol
 *             properties:
 *               nombre_completo: { type: string }
 *               usuario: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               id_rol: { type: integer }
 *               activo: { type: boolean }
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post('/', usuariosController.createUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar usuario (sin cambiar password)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_completo: { type: string }
 *               email: { type: string }
 *               id_rol: { type: integer }
 *               activo: { type: boolean }
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put('/:id', usuariosController.updateUsuario);

/**
 * @swagger
 * /api/usuarios/{id}/password:
 *   patch:
 *     summary: Cambiar contraseña de usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password_actual
 *               - password_nueva
 *             properties:
 *               password_actual: { type: string }
 *               password_nueva: { type: string }
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Contraseña actual incorrecta
 */
router.patch('/:id/password', usuariosController.changePassword);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Desactivar usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario desactivado
 */
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;
