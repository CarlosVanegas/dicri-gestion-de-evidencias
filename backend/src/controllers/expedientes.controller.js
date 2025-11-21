// src/controllers/expedientes.controller.js
const expedientesService = require('../services/expedientes.service');

async function getExpedientes(req, res, next) {
    try {
        const data = await expedientesService.listar();
        res.json({ ok: true, data });
    } catch (err) {
        next(err);
    }
}

async function getExpedienteById(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        const expediente = await expedientesService.obtenerPorId(id);

        if (!expediente) {
            return res.status(404).json({
                ok: false,
                message: 'Expediente no encontrado',
            });
        }

        res.json({ ok: true, data: expediente });
    } catch (err) {
        next(err);
    }
}

async function createExpediente(req, res, next) {
    try {
        const { codigo_expediente, titulo, descripcion, id_tecnico_registra, id_estado_actual } = req.body;

        // Podrías validar que vengan obligatorios: codigo_expediente, id_tecnico_registra, id_estado_actual
        const nuevo = await expedientesService.crear({
            codigo_expediente,
            titulo,
            descripcion,
            id_tecnico_registra,
            id_estado_actual,
        });

        res.status(201).json({
            ok: true,
            data: nuevo,
        });
    } catch (err) {
        next(err);
    }
}

async function updateExpediente(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);
        const { titulo, descripcion, id_estado_actual } = req.body;

        const actualizado = await expedientesService.actualizar(id, {
            titulo,
            descripcion,
            id_estado_actual,
        });

        if (!actualizado) {
            return res.status(404).json({
                ok: false,
                message: 'Expediente no encontrado',
            });
        }

        res.json({
            ok: true,
            data: actualizado,
        });
    } catch (err) {
        next(err);
    }
}

async function crearExpediente(req, res) {
    try {
        const { codigo_expediente, titulo, descripcion } = req.body;
        const id_tecnico_registra = req.user.id_usuario; // asumiendo middleware auth
        const id_estado_inicial = 1; // Registrado

        const expediente = await expedientesRepo.crearExpediente({
            codigo_expediente,
            titulo,
            descripcion,
            id_tecnico_registra,
            id_estado_inicial,
        });

        res.status(201).json({ message: 'Expediente creado', expediente });
    } catch (error) {
        console.error('Error crearExpediente:', error);
        res.status(500).json({ message: 'Error al crear expediente', error: error.message });
    }
}

async function obtenerExpediente(req, res) {
    try {
        const { id } = req.params;
        const expediente = await expedientesRepo.obtenerExpedientePorId(parseInt(id, 10));

        if (!expediente) {
            return res.status(404).json({ message: 'Expediente no encontrado' });
        }

        // Opcional: incluir indicios
        const indicios = await indiciosRepo.obtenerIndiciosPorExpediente(expediente.id_expediente);

        res.json({ expediente, indicios });
    } catch (error) {
        console.error('Error obtenerExpediente:', error);
        res.status(500).json({ message: 'Error al obtener expediente', error: error.message });
    }
}

async function listarExpedientes(req, res) {
    try {
        const { fecha_desde, fecha_hasta, id_estado } = req.query;

        const data = await expedientesRepo.listarExpedientes({
            fecha_desde: fecha_desde || null,
            fecha_hasta: fecha_hasta || null,
            id_estado: id_estado ? parseInt(id_estado, 10) : null,
        });

        res.json(data);
    } catch (error) {
        console.error('Error listarExpedientes:', error);
        res.status(500).json({ message: 'Error al listar expedientes', error: error.message });
    }
}

async function aprobarExpediente(req, res) {
    try {
        const { id } = req.params;
        const id_usuario_coordinador = req.user.id_usuario; // coordinador

        await expedientesRepo.aprobarExpediente(parseInt(id, 10), id_usuario_coordinador);

        res.json({ message: 'Expediente aprobado correctamente' });
    } catch (error) {
        console.error('Error aprobarExpediente:', error);
        res.status(500).json({ message: 'Error al aprobar expediente', error: error.message });
    }
}

async function rechazarExpediente(req, res) {
    try {
        const { id } = req.params;
        const { justificacion } = req.body;
        const id_usuario_coordinador = req.user.id_usuario;

        await expedientesRepo.rechazarExpediente(
            parseInt(id, 10),
            id_usuario_coordinador,
            justificacion,
        );

        res.json({ message: 'Expediente rechazado correctamente' });
    } catch (error) {
        console.error('Error rechazarExpediente:', error);
        res.status(500).json({ message: 'Error al rechazar expediente', error: error.message });
    }
}

async function eliminarExpediente(req, res) {
    try {
        const { id } = req.params;

        await expedientesRepo.eliminarExpediente(parseInt(id, 10));

        res.json({ message: 'Expediente eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminarExpediente:', error);
        res.status(500).json({ message: 'Error al eliminar expediente', error: error.message });
    }
}


module.exports = {
    getExpedientes,
    getExpedienteById,
    createExpediente,
    updateExpediente,
    crearExpediente,
    obtenerExpediente,
    listarExpedientes,
    aprobarExpediente,
    rechazarExpediente,
    eliminarExpediente
};