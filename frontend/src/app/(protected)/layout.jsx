"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedLayout({ children }) {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="min-h-screen flex bg-slate-100">
            {/* Aquí luego puedes poner sidebar / navbar */}
            <main className="flex-1 p-6 space-y-4">
                <header className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold">
                        DICRI – Gestión de Evidencias ({user.rol})
                    </h1>
                    <button
                        className="text-sm text-red-600"
                        onClick={() => {
                            logout();
                            router.push("/login");
                        }}
                    >
                        Cerrar sesión
                    </button>
                </header>
                {children}
            </main>
        </div>
    );
}
