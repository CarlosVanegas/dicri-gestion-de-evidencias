"use client";

import { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/expedientes", label: "Expedientes" },
    { href: "/indicios", label: "Indicios" },
    { href: "/usuarios", label: "Usuarios" },
    { href: "/configuracion", label: "Configuración" },
];

export default function ProtectedLayout({ children }) {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    if (!user) return null;

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const sectionTitle = (() => {
        if (pathname === "/dashboard") return "Dashboard";
        if (pathname.startsWith("/expedientes")) return "Expedientes";
        if (pathname.startsWith("/indicios")) return "Indicios";
        if (pathname.startsWith("/usuarios")) return "Usuarios";
        if (pathname.startsWith("/configuracion")) return "Configuración";
        return "Sistema DICRI";
    })();

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* SIDEBAR */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 shadow-sm">
                <div className="h-16 flex items-center px-6 border-b border-slate-200/80">
                    <div className="flex flex-col">
            <span className="text-[11px] tracking-[0.25em] text-slate-400 uppercase">
              DICRI
            </span>
                        <span className="text-sm font-semibold text-slate-900">
              Gestión de Evidencias
            </span>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                                    active
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                            >
                <span
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-semibold border transition ${
                        active
                            ? "border-slate-700 bg-slate-800 text-slate-50"
                            : "border-slate-200 bg-white text-slate-500 group-hover:border-slate-300"
                    }`}
                >
                  {item.label[0]}
                </span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-4 py-4 border-t border-slate-200/80 text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-semibold">
                            {user?.nombre_completo?.[0] || user?.usuario?.[0] || "U"}
                        </div>
                        <div className="flex flex-col">
              <span className="font-medium text-slate-800 truncate">
                {user?.nombre_completo || user?.usuario}
              </span>
                            <span className="uppercase tracking-wide text-[10px]">
                {user?.rol || "Usuario"}
              </span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-3 inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            {/* CONTENIDO */}
            <div className="flex-1 flex flex-col">
                {/* TOPBAR */}
                <header className="h-16 bg-white/90 backdrop-blur border-b border-slate-200 px-4 md:px-8 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span>Panel</span>
                            <span>•</span>
                            <span className="text-slate-500">{sectionTitle}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">
              {sectionTitle === "Dashboard"
                  ? "Dashboard de evidencias"
                  : sectionTitle}
            </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col items-end text-[11px] text-slate-500">
                            <span>Sesión activa</span>
                            <span className="font-semibold text-slate-800">
                {user?.usuario}
              </span>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
                            {user?.usuario?.[0] || "U"}
                        </div>
                    </div>
                </header>

                {/* MAIN */}
                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto animate-[fadeIn_0.25s_ease-out]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
