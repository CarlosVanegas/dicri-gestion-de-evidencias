const catalogosRepo = require('../repositories/catalogos.repository');

async function obtenerEstadosExpediente(req, res) {
    try {
        const estados = await catalogosRepo.obtenerEstadosExpediente();
        res.json(estados);
    } catch (error) {
        console.error('Error obtenerEstadosExpediente:', error);
        res.status(500).json({ message: 'Error al obtener estados', error: error.message });
    }
}

module.exports = {
    obtenerEstadosExpediente,
};
