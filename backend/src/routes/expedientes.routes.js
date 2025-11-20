// src/routes/expedientes.routes.js
const express = require('express');
const router = express.Router();
const expedientesController = require('../controllers/expedientes.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Todas las rutas de expedientes requieren autenticación
router.use(authMiddleware);

// Listar expedientes
router.get('/', expedientesController.getExpedientes);

// Obtener por id
router.get('/:id', expedientesController.getExpedienteById);

// Crear expediente
router.post('/', expedientesController.createExpediente);

// Actualizar expediente
router.put('/:id', expedientesController.updateExpediente);

module.exports = router;