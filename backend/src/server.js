// src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/error.middleware');
const estadosRoutes = require('./routes/estados.routes');
const rolesRoutes = require('./routes/roles.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const { getPool } = require('./config/db');

// cargar .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Probar que hay vida
app.get('/api/health', (req, res) => {
    res.json({ ok: true, message: 'Backend DICRI funcionando' });
});

// Probar conexión a BD
app.get('/api/db-test', async (req, res, next) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query('SELECT GETDATE() AS fecha');
        res.json({ ok: true, result: result.recordset[0] });
    } catch (err) {
        next(err);
    }
});

// Rutas (auth será la primera)
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
app.use('/api/estados', estadosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuariosRoutes);
// Middleware de errores al final
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
