// src/middlewares/error.middleware.js
function errorMiddleware(err, req, res, next) {
    console.error('Error:', err);

    const status = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(status).json({
        ok: false,
        message
    });
}

module.exports = errorMiddleware;