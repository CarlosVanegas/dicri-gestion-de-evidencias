"use client";

import { motion } from "framer-motion";

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
};

const usuariosMock = [
    {
        id: 1,
        nombre: "Administrador General",
        usuario: "admin",
        rol: "ADMIN",
        email: "admin@dicri.local",
        activo: true,
    },
    {
        id: 2,
        nombre: "Investigador 01",
        usuario: "inv01",
        rol: "INVESTIGADOR",
        email: "inv01@dicri.local",
        activo: true,
    },
    {
        id: 3,
        nombre: "Digitador 01",
        usuario: "dig01",
        rol: "DIGITADOR",
        email: "dig01@dicri.local",
        activo: false,
    },
];

export default function UsuariosPage() {
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
                        Usuarios del sistema
                    </h1>
                    <p className="text-sm text-slate-500">
                        Administración de cuentas, roles y estado de acceso.
                    </p>
                </div>
                <button className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition">
                    Nuevo usuario
                </button>
            </header>

            <motion.div
                className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.22 }}
            >
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                            Usuarios registrados
                        </h2>
                        <p className="text-xs text-slate-500">
                            Control de acceso al módulo de gestión de evidencias.
                        </p>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o usuario..."
                        className="hidden md:block rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                    />
                </div>
                <div className="overflow-x-auto text-sm">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                        <tr className="bg-slate-50">
                            {["Nombre", "Usuario", "Rol", "Correo", "Estado", ""].map(
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
                        {usuariosMock.map((u, idx) => (
                            <tr
                                key={u.id}
                                className={`hover:bg-slate-50 transition ${
                                    idx !== usuariosMock.length - 1
                                        ? "border-b border-slate-50"
                                        : ""
                                }`}
                            >
                                <td className="px-4 py-2 text-xs text-slate-800">
                                    {u.nombre}
                                </td>
                                <td className="px-4 py-2 text-xs font-mono text-slate-700">
                                    {u.usuario}
                                </td>
                                <td className="px-4 py-2 text-xs">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {u.rol}
                    </span>
                                </td>
                                <td className="px-4 py-2 text-xs text-slate-700">
                                    {u.email}
                                </td>
                                <td className="px-4 py-2 text-xs">
                    <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            u.activo
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                        }`}
                    >
                      {u.activo ? "Activo" : "Inactivo"}
                    </span>
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
