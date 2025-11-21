const reportesRepo = require('../repositories/reportes.repository');

async function reporteExpedientes(req, res) {
    try {
        const { fecha_desde, fecha_hasta, id_estado } = req.query;

        const data = await reportesRepo.reporteExpedientes({
            fecha_desde: fecha_desde || null,
            fecha_hasta: fecha_hasta || null,
            id_estado: id_estado ? parseInt(id_estado, 10) : null,
        });

        res.json(data);
    } catch (error) {
        console.error('Error reporteExpedientes:', error);
        res.status(500).json({ message: 'Error al generar reporte', error: error.message });
    }
}

async function reporteEstadisticas(req, res) {
    try {
        const { fecha_desde, fecha_hasta } = req.query;

        const data = await reportesRepo.reporteEstadisticas({
            fecha_desde: fecha_desde || null,
            fecha_hasta: fecha_hasta || null,
        });

        res.json(data);
    } catch (error) {
        console.error('Error reporteEstadisticas:', error);
        res.status(500).json({ message: 'Error al generar estadísticas', error: error.message });
    }
}

module.exports = {
    reporteExpedientes,
    reporteEstadisticas,
};
