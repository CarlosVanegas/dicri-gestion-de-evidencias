// src/routes/estados.routes.js
const express = require('express');
const router = express.Router();
const estadosController = require('../controllers/estados.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
console.log('Router de ESTADOS cargado');
// Todas las rutas de estados requieren autenticación
router.use(authMiddleware);

router.get('/', estadosController.getEstados);
router.get('/:id', estadosController.getEstadoById);
router.post('/', estadosController.createEstado);
router.put('/:id', estadosController.updateEstado);
router.delete('/:id', estadosController.deleteEstado);

module.exports = router;
