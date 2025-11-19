// src/utils/jwt.js
const jwt = require('jsonwebtoken');

function generarToken(payload) {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );
}

module.exports = { generarToken };