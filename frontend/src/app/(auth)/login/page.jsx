"use client";

import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { loginRequest } from "../../../lib/auth.api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await loginRequest(usuario, password);
            login(res.user, res.token);
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Usuario o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            {/* Fondo centrado */}
            <div className="relative w-full max-w-md">
                {/* “Tarjeta” */}
                <div className="bg-white/90 backdrop-blur shadow-xl rounded-2xl border border-slate-200 px-8 py-10">
                    {/* Logo / título */}
                    <div className="mb-8 text-center">
                        <p className="text-xs font-semibold tracking-[0.3em] text-slate-400 uppercase">
                            DICRI
                        </p>
                        <h1 className="mt-2 text-xl font-semibold text-slate-900">
                            Ingreso al sistema DICRI
                        </h1>
                        <p className="mt-1 text-xs text-slate-500">
                            Gestión de evidencias y expedientes
                        </p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label
                                htmlFor="usuario"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Usuario
                            </label>
                            <input
                                id="usuario"
                                className="block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                placeholder="Ingrese su usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                autoComplete="username"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>

                        {error && (
                            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {loading ? "Ingresando..." : "Ingresar"}
                        </button>
                    </form>

                    {/* Footer pequeñito */}
                    <p className="mt-6 text-[11px] text-center text-slate-400">
                        Plataforma técnica de gestión de evidencias — Prueba DICRI
                    </p>
                </div>
            </div>
        </main>
    );
}
