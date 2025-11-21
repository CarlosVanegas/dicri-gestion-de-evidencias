const express = require('express');
const router = express.Router();

const indiciosCtrl = require('../controllers/indicios.controller');
// const { requireAuth } = require('../middlewares/auth');

router.get(
    '/:id',
    // requireAuth,
    indiciosCtrl.obtenerIndicio,
);

router.put(
    '/:id',
    // requireAuth,
    indiciosCtrl.actualizarIndicio,
);

router.delete(
    '/:id',
    // requireAuth,
    indiciosCtrl.eliminarIndicio,
);

module.exports = router;
