// src/routes/roles.routes.js
const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Todas las rutas de roles requieren autenticación
router.use(authMiddleware);

router.get('/', rolesController.getRoles);
router.get('/:id', rolesController.getRolById);
router.post('/', rolesController.createRol);
router.put('/:id', rolesController.updateRol);
router.delete('/:id', rolesController.deleteRol);

module.exports = router;
