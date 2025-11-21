// src/routes/expedientes.routes.js
const express = require('express');
const router = express.Router();
const expedientesController = require('../controllers/expedientes.controller');
const expedientesCtrl = require('../controllers/expedientes.controller');
const indiciosCtrl = require('../controllers/indicios.controller');
const { requireAuth, requireRole, requireRoles } = require('../middlewares/auth');
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
    requireAuth,
    expedientesCtrl.listarExpedientes,
)
// Crear expediente
router.post(
    '/',
    requireAuth,
    requireRoles(['TECNICO', 'COORDINADOR', 'ADMIN']),
    expedientesCtrl.crearExpediente,
);

router.delete(
    '/:id',
    requireAuth,
    requireRole('ADMIN'),
    expedientesCtrl.eliminarExpediente,
);

// Aprobar expediente (solo COORDINADOR)
router.post(
    '/:id/aprobar',
    requireAuth,
    requireRole('COORDINADOR'),
    expedientesCtrl.aprobarExpediente,
);

// Rechazar expediente (solo COORDINADOR)
router.post(
    '/:id/rechazar',
    requireAuth,
    requireRole('COORDINADOR'),
    expedientesCtrl.rechazarExpediente,
);

// ----- Indicios anidados por expediente -----

// Listar indicios de un expediente (autenticado)
router.get(
    '/:idExpediente/indicios',
    requireAuth,
    indiciosCtrl.obtenerIndiciosPorExpediente,
);

// Crear indicio (TÉCNICO, COORDINADOR, ADMIN)
router.post(
    '/:idExpediente/indicios',
    requireAuth,
    requireRoles(['TECNICO', 'COORDINADOR', 'ADMIN']),
    indiciosCtrl.crearIndicio,
);


module.exports = router;