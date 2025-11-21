"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    fetchUsers,
    createUser,
    updateUser,
    deactivateUser,
} from "../../../lib/users.api";

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
};

const defaultForm = {
    id_usuario: null,
    nombre_completo: "",
    usuario: "",
    email: "",
    id_rol: "",
    activo: true,
    password: "",
};


export default function UsuariosPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState(defaultForm);
    const [isEdit, setIsEdit] = useState(false);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await fetchUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setError("No se pudieron cargar los usuarios.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // 🔧 Abrir modal en modo crear
    const handleNewUser = () => {
        setForm(defaultForm);
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const handleEditUser = (user) => {
        setForm({
            id_usuario: user.id_usuario,
            nombre_completo: user.nombre_completo,
            usuario: user.usuario,
            email: user.email,
            id_rol: user.id_rol?.toString() || "",
            activo: user.activo === true || user.activo === 1,
        });
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleDeactivate = async (user) => {
        if (
            !window.confirm(
                `¿Seguro que deseas desactivar al usuario "${user.usuario}"?`
            )
        ) {
            return;
        }
        try {
            await deactivateUser(user.id_usuario);
            // refrescar lista
            await loadUsers();
        } catch (err) {
            console.error(err);
            alert("No se pudo desactivar el usuario.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const payload = {
                nombre_completo: form.nombre_completo,
                usuario: form.usuario,
                email: form.email,
                id_rol: form.id_rol ? parseInt(form.id_rol, 10) : null,
                activo: form.activo,
            };

            if (!payload.nombre_completo || !payload.usuario) {
                setError("Nombre y usuario son obligatorios.");
                setSaving(false);
                return;
            }

            // 🔐 Password requerido al CREAR usuario
            if (!isEdit) {
                if (!form.password || form.password.length < 6) {
                    setError("La contraseña es obligatoria y debe tener al menos 6 caracteres.");
                    setSaving(false);
                    return;
                }
                payload.password = form.password;
            }

            if (isEdit && form.id_usuario) {
                await updateUser(form.id_usuario, payload);
            } else {
                await createUser(payload);
            }

            setIsModalOpen(false);
            setForm(defaultForm);
            await loadUsers();
        } catch (err) {
            console.error(err);
            const msg =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Ocurrió un error al guardar el usuario.";
            setError(msg);
        } finally {
            setSaving(false);
        }
    };

    const filteredUsers = users.filter((u) => {
        const term = search.toLowerCase();
        return (
            u.nombre_completo?.toLowerCase().includes(term) ||
            u.usuario?.toLowerCase().includes(term) ||
            u.email?.toLowerCase().includes(term)
        );
    });

    return (
        <>
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
                    <button
                        onClick={handleNewUser}
                        className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition"
                    >
                        Nuevo usuario
                    </button>
                </header>

                <motion.div
                    className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.22 }}
                >
                    <div className="px-4 py-3 border-b border-slate-200 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                        />
                    </div>

                    {loading ? (
                        <div className="px-4 py-6 text-center text-xs text-slate-500">
                            Cargando usuarios...
                        </div>
                    ) : (
                        <div className="overflow-x-auto text-sm">
                            <table className="min-w-full border-separate border-spacing-0">
                                <thead>
                                <tr className="bg-slate-50">
                                    {[
                                        "Nombre",
                                        "Usuario",
                                        "Rol",
                                        "Correo",
                                        "Estado",
                                        "Acciones",
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.map((u, idx) => (
                                    <tr
                                        key={u.id_usuario || u.usuario}
                                        className={`hover:bg-slate-50 transition ${
                                            idx !== filteredUsers.length - 1
                                                ? "border-b border-slate-50"
                                                : ""
                                        }`}
                                    >
                                        <td className="px-4 py-2 text-xs text-slate-800">
                                            {u.nombre_completo}
                                        </td>
                                        <td className="px-4 py-2 text-xs font-mono text-slate-700">
                                            {u.usuario}
                                        </td>
                                        <td className="px-4 py-2 text-xs">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                          {u.rol_nombre || u.rol || "—"}
                        </span>
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-700">
                                            {u.email}
                                        </td>
                                        <td className="px-4 py-2 text-xs">
                        <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                                u.activo === true || u.activo === 1
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-slate-100 text-slate-500"
                            }`}
                        >
                          {u.activo === true || u.activo === 1
                              ? "Activo"
                              : "Inactivo"}
                        </span>
                                        </td>
                                        <td className="px-4 py-2 text-xs text-slate-400">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditUser(u)}
                                                    className="text-[11px] text-slate-600 hover:text-slate-900"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeactivate(u)}
                                                    className="text-[11px] text-rose-600 hover:text-rose-700"
                                                >
                                                    Desactivar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {!loading && filteredUsers.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-4 py-6 text-center text-xs text-slate-500"
                                        >
                                            No se encontraron usuarios con los filtros actuales.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>

                {error && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                        {error}
                    </p>
                )}
            </motion.section>

            {/* MODAL crear / editar */}
            {isModalOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
                    <motion.div
                        className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-200 p-5"
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">
                                    {isEdit ? "Editar usuario" : "Nuevo usuario"}
                                </h2>
                                <p className="text-[11px] text-slate-500">
                                    Completa los campos para guardar la cuenta de acceso.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-xs text-slate-400 hover:text-slate-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                            <div className="space-y-1">
                                <label className="font-medium text-slate-700">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    value={form.nombre_completo}
                                    onChange={(e) =>
                                        setForm((f) => ({
                                            ...f,
                                            nombre_completo: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                                />
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="font-medium text-slate-700">Usuario</label>
                                    <input
                                        type="text"
                                        value={form.usuario}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                usuario: e.target.value,
                                            }))
                                        }
                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-medium text-slate-700">Rol</label>
                                    <select
                                        value={form.id_rol}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, id_rol: e.target.value }))
                                        }
                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                                    >
                                        <option value="">Seleccionar rol...</option>
                                        {/* Ajusta estos IDs a los de tu tabla roles */}
                                        <option value="1">ADMIN</option>
                                        <option value="2">INVESTIGADOR</option>
                                        <option value="3">DIGITADOR</option>
                                    </select>
                                </div>
                            </div>

                            {!isEdit && (
                                <div className="space-y-1">
                                    <label className="font-medium text-slate-700">
                                        Contraseña inicial
                                    </label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, password: e.target.value }))
                                        }
                                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                                        placeholder="Define una contraseña temporal"
                                    />
                                    <p className="text-[10px] text-slate-400">
                                        El usuario podrá cambiarla más adelante.
                                    </p>
                                </div>
                            )}


                            <div className="space-y-1">
                                <label className="font-medium text-slate-700">Correo</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, email: e.target.value }))
                                    }
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 text-[11px] text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={form.activo}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, activo: e.target.checked }))
                                        }
                                        className="accent-slate-900"
                                    />
                                    Usuario activo
                                </label>
                            </div>

                            {error && (
                                <p className="text-[11px] text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                                    {error}
                                </p>
                            )}

                            <div className="mt-3 flex justify-end gap-2 text-[11px]">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-slate-900 px-4 py-1.5 font-medium text-white hover:bg-slate-800 disabled:opacity-60"
                                >
                                    {saving
                                        ? isEdit
                                            ? "Guardando..."
                                            : "Creando..."
                                        : isEdit
                                            ? "Guardar cambios"
                                            : "Crear usuario"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </>
    );
}
