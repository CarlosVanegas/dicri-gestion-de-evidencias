const express = require('express');
const router = express.Router();

const indiciosCtrl = require('../controllers/indicios.controller');
const { requireAuth, requireRoles } = require('../middlewares/auth');

// Ver detalle de indicio
router.get(
    '/:id',
    requireAuth,
    indiciosCtrl.obtenerIndicio,
);

// Actualizar indicio (TÉCNICO, COORDINADOR, ADMIN)
router.put(
    '/:id',
    requireAuth,
    requireRoles(['TECNICO', 'COORDINADOR', 'ADMIN']),
    indiciosCtrl.actualizarIndicio,
);

// Eliminar indicio (ADMIN o COORDINADOR si quieres)
router.delete(
    '/:id',
    requireAuth,
    requireRoles(['ADMIN', 'COORDINADOR']),
    indiciosCtrl.eliminarIndicio,
);


module.exports = router;
