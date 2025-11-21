"use client";

import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
};

export default function ConfiguracionPage() {
    return (
        <motion.section
            className="space-y-6"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.25, ease: "easeOut" }}
        >
            <header className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
                    Configuración del sistema
                </h1>
                <p className="text-sm text-slate-500">
                    Parámetros generales de la plataforma, notificaciones y seguridad.
                </p>
            </header>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
                {/* Config general */}
                <motion.div
                    className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-4 space-y-4"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.22 }}
                >
                    <h2 className="text-sm font-semibold text-slate-900">
                        Datos generales
                    </h2>
                    <div className="grid gap-3 md:grid-cols-2 text-xs">
                        <div className="space-y-1">
                            <label className="font-medium text-slate-700">
                                Nombre del sistema
                            </label>
                            <input
                                type="text"
                                defaultValue="DICRI - Gestión de Evidencias"
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="font-medium text-slate-700">
                                Correo de notificaciones
                            </label>
                            <input
                                type="email"
                                defaultValue="notificaciones@dicri.local"
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="font-medium text-slate-700">
                                Tiempo máx. de inactividad (minutos)
                            </label>
                            <input
                                type="number"
                                defaultValue={30}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="font-medium text-slate-700">
                                Prefijo de expedientes
                            </label>
                            <input
                                type="text"
                                defaultValue="EXP-"
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                            />
                        </div>
                    </div>
                    <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition">
                        Guardar cambios
                    </button>
                </motion.div>

                {/* Panel lateral: notificaciones / seguridad */}
                <motion.div
                    className="rounded-2xl bg-slate-900 text-slate-50 shadow-md p-4 space-y-4"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.22 }}
                >
                    <div>
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400">
                            Notificaciones
                        </p>
                        <h2 className="mt-2 text-sm font-semibold">
                            Alertas y correo electrónico
                        </h2>
                        <p className="mt-1 text-[11px] text-slate-300">
                            Define cómo y cuándo se notifica a los usuarios sobre cambios en
                            expedientes e indicios.
                        </p>
                    </div>

                    <div className="space-y-2 text-[11px]">
                        <label className="flex items-center justify-between gap-2">
                            <span>Alertar expedientes de prioridad alta</span>
                            <input type="checkbox" defaultChecked className="accent-blue-400" />
                        </label>
                        <label className="flex items-center justify-between gap-2">
                            <span>Enviar resumen diario por correo</span>
                            <input type="checkbox" defaultChecked className="accent-blue-400" />
                        </label>
                        <label className="flex items-center justify-between gap-2">
                            <span>Notificar cambios de estado</span>
                            <input type="checkbox" defaultChecked className="accent-blue-400" />
                        </label>
                    </div>

                    <div className="pt-3 border-t border-slate-700/70">
                        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400">
                            Seguridad
                        </p>
                        <p className="mt-2 text-[11px] text-slate-300">
                            Recomendación: activar doble factor de autenticación y revisar
                            periódicamente los usuarios inactivos.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
