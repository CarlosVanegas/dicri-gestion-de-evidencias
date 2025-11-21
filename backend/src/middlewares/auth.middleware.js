// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function requireAuth(req, res, next) {
    try {
        const header = req.headers['authorization'];

        if (!header) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const [type, token] = header.split(' ');

        if (type !== 'Bearer' || !token) {
            return res.status(401).json({ message: 'Formato de token inválido' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        // Guardamos info del usuario en la request
        req.user = decoded;

        next();
    } catch (error) {
        console.error('Error en requireAuth:', error);
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

function requireRole(rolRequerido) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }

        if (req.user.rol !== rolRequerido) {
            return res.status(403).json({ message: 'No tiene permisos suficientes' });
        }

        next();
    };
}


function requireRoles(rolesPermitidos = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }

        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No tiene permisos suficientes' });
        }

        next();
    };
}

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

module.exports = { authMiddleware,requireAuth, requireRole, requireRoles };