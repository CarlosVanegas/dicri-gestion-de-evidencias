// src/routes/roles.routes.js
const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Todas las rutas de roles requieren autenticación
router.use(authMiddleware);
/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles del sistema
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Listar roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 */
router.get('/', rolesController.getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener rol por ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', rolesController.getRolById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', rolesController.createRol);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', rolesController.updateRol);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', rolesController.deleteRol);

module.exports = router;
