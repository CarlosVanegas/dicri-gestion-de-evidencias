"use client";

import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
};

const expedientesMock = [
    {
        codigo: "EXP-2025-0010",
        titulo: "Robo a estación de servicio",
        estado: "En revisión",
        prioridad: "Alta",
        responsable: "Investigador 01",
        fecha: "2025-11-15",
    },
    {
        codigo: "EXP-2025-0011",
        titulo: "Vandalismo en parqueo",
        estado: "Pendiente",
        prioridad: "Media",
        responsable: "Investigador 02",
        fecha: "2025-11-16",
    },
    {
        codigo: "EXP-2025-0012",
        titulo: "Daños a propiedad privada",
        estado: "Aprobado",
        prioridad: "Baja",
        responsable: "Investigador 03",
        fecha: "2025-11-17",
    },
];

export default function ExpedientesPage() {
    return (
        <motion.section
            className="space-y-6"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            {/* Header */}
            <header className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
                        Expedientes
                    </h1>
                    <p className="text-sm text-slate-500">
                        Gestión completa de expedientes: creación, consulta y seguimiento
                        detallado.
                    </p>
                </div>
                <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition">
                    Nuevo expediente
                </button>
            </header>

            {/* Filtros */}
            <motion.div
                className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-4 space-y-3"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.22 }}
            >
                <div className="grid gap-2 md:grid-cols-4">
                    <input
                        type="text"
                        placeholder="Buscar por código o título..."
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                    />
                    <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white">
                        <option value="">Estado</option>
                        <option>En revisión</option>
                        <option>Pendiente</option>
                        <option>Aprobado</option>
                    </select>
                    <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white">
                        <option value="">Prioridad</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                    </select>
                    <input
                        type="date"
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                    />
                </div>
            </motion.div>

            {/* Tabla */}
            <motion.div
                className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.22 }}
            >
                <div className="px-4 py-3 border-b border-slate-200">
                    <h2 className="text-sm font-semibold text-slate-900">
                        Expedientes registrados
                    </h2>
                    <p className="text-xs text-slate-500">
                        Vista general de expedientes activos en el sistema.
                    </p>
                </div>
                <div className="overflow-x-auto text-sm">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                        <tr className="bg-slate-50">
                            {["Código", "Título", "Estado", "Prioridad", "Responsable", "Fecha", ""].map(
                                (h) => (
                                    <th
                                        key={h}
                                        className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200"
                                    >
                                        {h}
                                    </th>
                                )
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {expedientesMock.map((e, idx) => (
                            <tr
                                key={e.codigo}
                                className={`hover:bg-slate-50 transition ${
                                    idx !== expedientesMock.length - 1
                                        ? "border-b border-slate-50"
                                        : ""
                                }`}
                            >
                                <td className="px-4 py-2 text-xs font-mono text-slate-700">
                                    {e.codigo}
                                </td>
                                <td className="px-4 py-2 text-xs text-slate-800">
                                    {e.titulo}
                                </td>
                                <td className="px-4 py-2 text-xs">
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            e.estado === "Aprobado"
                                ? "bg-emerald-50 text-emerald-700"
                                : e.estado === "En revisión"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-slate-100 text-slate-700"
                        }`}
                    >
                      {e.estado}
                    </span>
                                </td>
                                <td className="px-4 py-2 text-xs">
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            e.prioridad === "Alta"
                                ? "bg-rose-50 text-rose-700"
                                : e.prioridad === "Media"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-slate-100 text-slate-700"
                        }`}
                    >
                      {e.prioridad}
                    </span>
                                </td>
                                <td className="px-4 py-2 text-xs text-slate-700">
                                    {e.responsable}
                                </td>
                                <td className="px-4 py-2 text-xs text-slate-500">
                                    {e.fecha}
                                </td>
                                <td className="px-4 py-2 text-right text-xs text-slate-400">
                                    ⋮
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.section>
    );
}
