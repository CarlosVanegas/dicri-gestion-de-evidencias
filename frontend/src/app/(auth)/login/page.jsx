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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await loginRequest(usuario, password);
            login(res.user, res.token);
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4"
            >
                <h1 className="text-xl font-semibold text-center">
                    Ingreso al sistema DICRI
                </h1>

                <input
                    className="border px-3 py-2 w-full rounded"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />

                <input
                    className="border px-3 py-2 w-full rounded"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
                >
                    Ingresar
                </button>
            </form>
        </main>
    );
}
