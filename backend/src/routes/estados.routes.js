// src/routes/estados.routes.js
const express = require('express');
const router = express.Router();
const estadosController = require('../controllers/estados.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
console.log('Router de ESTADOS cargado');
// Todas las rutas de estados requieren autenticación
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Estados
 *   description: Estados posibles para expedientes
 */

/**
 * @swagger
 * /api/estados:
 *   get:
 *     summary: Listar estados
 *     tags: [Estados]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', estadosController.getEstados);

/**
 * @swagger
 * /api/estados/{id}:
 *   get:
 *     summary: Obtener estado por ID
 *     tags: [Estados]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', estadosController.getEstadoById);

/**
 * @swagger
 * /api/estados:
 *   post:
 *     summary: Crear estado
 *     tags: [Estados]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', estadosController.createEstado);

/**
 * @swagger
 * /api/estados/{id}:
 *   put:
 *     summary: Actualizar estado
 *     tags: [Estados]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', estadosController.updateEstado);

/**
 * @swagger
 * /api/estados/{id}:
 *   delete:
 *     summary: Eliminar estado
 *     tags: [Estados]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', estadosController.deleteEstado);


module.exports = router;
