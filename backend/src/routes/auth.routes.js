// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ ok: true, message: 'Auth API funcionando' });
});

module.exports = router;
