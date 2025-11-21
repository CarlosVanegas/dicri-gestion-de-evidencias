"use client";

import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
};

const indiciosMock = [
    {
        id: 1,
        etiqueta: "IND-001",
        tipo: "Fotografía",
        descripcion: "Captura de cámara de seguridad en acceso principal.",
        expediente: "EXP-2025-0010",
        fecha: "2025-11-15",
        responsable: "Investigador 01",
    },
    {
        id: 2,
        etiqueta: "IND-002",
        tipo: "Objeto físico",
        descripcion: "Herramienta metálica encontrada en la escena.",
        expediente: "EXP-2025-0011",
        fecha: "2025-11-16",
        responsable: "Bodega de evidencias",
    },
    {
        id: 3,
        etiqueta: "IND-003",
        tipo: "Documento",
        descripcion: "Acta de denuncia firmada por testigo presencial.",
        expediente: "EXP-2025-0012",
        fecha: "2025-11-17",
        responsable: "Investigador 03",
    },
];

export default function IndiciosPage() {
    return (
        <motion.section
            className="space-y-6"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            <header className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
                        Indicios y evidencias
                    </h1>
                    <p className="text-sm text-slate-500">
                        Registro y organización de indicios asociados a cada expediente.
                    </p>
                </div>
                <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition">
                    Nuevo indicio
                </button>
            </header>

            {/* Filtro simple */}
            <motion.div
                className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-4"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.22 }}
            >
                <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
                    <input
                        type="text"
                        placeholder="Buscar por etiqueta, expediente o descripción..."
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                    />
                    <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white">
                        <option value="">Tipo de indicio</option>
                        <option>Fotografía</option>
                        <option>Video</option>
                        <option>Objeto físico</option>
                        <option>Documento</option>
                    </select>
                    <input
                        type="date"
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                    />
                </div>
            </motion.div>

            {/* Grid de indicios */}
            <motion.div
                className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.22 }}
            >
                {indiciosMock.map((i, idx) => (
                    <motion.article
                        key={i.id}
                        className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-4 flex flex-col justify-between hover:-translate-y-[2px] hover:shadow-md transition"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 + idx * 0.04, duration: 0.25 }}
                    >
                        <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-900">
                {i.etiqueta}
              </span>
                            <span className="text-[11px] rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                {i.tipo}
              </span>
                        </div>
                        <p className="mt-3 text-xs text-slate-700 leading-relaxed">
                            {i.descripcion}
                        </p>
                        <div className="mt-4 space-y-1 text-[11px] text-slate-500">
                            <div className="flex justify-between">
                                <span className="font-medium text-slate-600">Expediente</span>
                                <span>{i.expediente}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-slate-600">Responsable</span>
                                <span>{i.responsable}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-slate-600">Fecha</span>
                                <span>{i.fecha}</span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </motion.section>
    );
}
