// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', (req, res) => {
    res.json({ ok: true, message: 'Auth API funcionando' });
});

// Login
router.post('/login', authController.login);

module.exports = router;
