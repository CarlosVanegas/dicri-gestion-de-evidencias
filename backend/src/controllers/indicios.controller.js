const indiciosRepo = require('../repositories/indicios.repository');

async function crearIndicio(req, res) {
    try {
        const { idExpediente } = req.params;
        const {
            descripcion,
            color,
            tamano,
            peso,
            ubicacion,
        } = req.body;

        const id_tecnico_registra = req.user.id_usuario;

        const result = await indiciosRepo.crearIndicio({
            id_expediente: parseInt(idExpediente, 10),
            descripcion,
            color,
            tamano,
            peso,
            ubicacion,
            id_tecnico_registra,
        });

        res.status(201).json({
            message: 'Indicio creado correctamente',
            id_indicio: result.id_indicio,
        });
    } catch (error) {
        console.error('Error crearIndicio:', error);
        res.status(500).json({ message: 'Error al crear indicio', error: error.message });
    }
}

async function obtenerIndiciosPorExpediente(req, res) {
    try {
        const { idExpediente } = req.params;
        const indicios = await indiciosRepo.obtenerIndiciosPorExpediente(parseInt(idExpediente, 10));

        res.json(indicios);
    } catch (error) {
        console.error('Error obtenerIndiciosPorExpediente:', error);
        res.status(500).json({ message: 'Error al obtener indicios', error: error.message });
    }
}

async function obtenerIndicio(req, res) {
    try {
        const { id } = req.params;
        const indicio = await indiciosRepo.obtenerIndicioPorId(parseInt(id, 10));

        if (!indicio) {
            return res.status(404).json({ message: 'Indicio no encontrado' });
        }

        res.json(indicio);
    } catch (error) {
        console.error('Error obtenerIndicio:', error);
        res.status(500).json({ message: 'Error al obtener indicio', error: error.message });
    }
}

async function actualizarIndicio(req, res) {
    try {
        const { id } = req.params;
        const {
            descripcion,
            color,
            tamano,
            peso,
            ubicacion,
        } = req.body;

        await indiciosRepo.actualizarIndicio({
            id_indicio: parseInt(id, 10),
            descripcion,
            color,
            tamano,
            peso,
            ubicacion,
        });

        res.json({ message: 'Indicio actualizado correctamente' });
    } catch (error) {
        console.error('Error actualizarIndicio:', error);
        res.status(500).json({ message: 'Error al actualizar indicio', error: error.message });
    }
}

async function eliminarIndicio(req, res) {
    try {
        const { id } = req.params;

        await indiciosRepo.eliminarIndicio(parseInt(id, 10));

        res.json({ message: 'Indicio eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminarIndicio:', error);
        res.status(500).json({ message: 'Error al eliminar indicio', error: error.message });
    }
}

module.exports = {
    crearIndicio,
    obtenerIndiciosPorExpediente,
    obtenerIndicio,
    actualizarIndicio,
    eliminarIndicio,
};
