const express = require('express');
const router = express.Router();
const catalogosCtrl = require('../controllers/catalogos.controller');
// const { requireAuth } = require('../middlewares/auth');

router.get(
    '/estados-expediente',
    // requireAuth,
    catalogosCtrl.obtenerEstadosExpediente,
);

module.exports = router;
