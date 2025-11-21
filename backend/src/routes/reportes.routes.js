const express = require('express');
const router = express.Router();
const reportesCtrl = require('../controllers/reportes.controller');
// const { requireAuth } = require('../middlewares/auth');

router.get(
    '/expedientes',
    // requireAuth,
    reportesCtrl.reporteExpedientes,
);

router.get(
    '/estadisticas',
    // requireAuth,
    reportesCtrl.reporteEstadisticas,
);

module.exports = router;
