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


// Lista expedientes (con filtros por query)
router.get(
    '/',
    // requireAuth,
    expedientesCtrl.listarExpedientes,
);

// Crear expediente
router.post(
    '/',
    // requireAuth,
    expedientesCtrl.crearExpediente,
);

// Obtener expediente + indicios
router.get(
    '/:id',
    // requireAuth,
    expedientesCtrl.obtenerExpediente,
);

// Eliminar expediente
router.delete(
    '/:id',
    // requireAuth,
    expedientesCtrl.eliminarExpediente,
);

// Aprobar expediente (solo coordinador)
router.post(
    '/:id/aprobar',
    // requireAuth,
    // requireRole('COORDINADOR'),
    expedientesCtrl.aprobarExpediente,
);

// Rechazar expediente (solo coordinador)
router.post(
    '/:id/rechazar',
    // requireAuth,
    // requireRole('COORDINADOR'),
    expedientesCtrl.rechazarExpediente,
);

// ----- Indicios anidados por expediente -----

router.get(
    '/:idExpediente/indicios',
    // requireAuth,
    indiciosCtrl.obtenerIndiciosPorExpediente,
);

router.post(
    '/:idExpediente/indicios',
    // requireAuth,
    indiciosCtrl.crearIndicio,
);


module.exports = router;