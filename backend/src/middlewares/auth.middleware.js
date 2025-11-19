// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({ ok: false, message: 'Token no proporcionado' });
    }

    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ ok: false, message: 'Formato de token inválido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ ok: false, message: 'Token inválido o expirado' });
    }
}

module.exports = { authMiddleware };