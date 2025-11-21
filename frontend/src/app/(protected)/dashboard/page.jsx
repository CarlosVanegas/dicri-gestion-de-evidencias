"use client";

import { useState } from "react";

const metricCards = [
    { key: "all", label: "Total expedientes", count: 128, amount: "—" },
    { key: "review", label: "En revisión", count: 14, amount: "—" },
    { key: "approved", label: "Aprobados", count: 96, amount: "—" },
    { key: "rejected", label: "Rechazados", count: 18, amount: "—" },
];

const tabs = [
    { key: "all", label: "Todos", badge: 20 },
    { key: "review", label: "En revisión", badge: 6 },
    { key: "approved", label: "Aprobados", badge: 10 },
    { key: "rejected", label: "Rechazados", badge: 4 },
];

const mockExpedientes = [
    {
        codigo: "EXP-2025-0012",
        titulo: "Robo en sucursal zona 1",
        estado: "En revisión",
        prioridad: "Alta",
        fecha_creacion: "2025-11-18",
        fecha_limite: "2025-11-20",
        responsable: "Investigador 01",
    },
    {
        codigo: "EXP-2025-0013",
        titulo: "Incidente en bodega central",
        estado: "Aprobado",
        prioridad: "Media",
        fecha_creacion: "2025-11-19",
        fecha_limite: "2025-11-25",
        responsable: "Investigador 02",
    },
    {
        codigo: "EXP-2025-0014",
        titulo: "Daños a propiedad privada",
        estado: "Pendiente",
        prioridad: "Alta",
        fecha_creacion: "2025-11-19",
        fecha_limite: "2025-11-22",
        responsable: "Investigador 03",
    },
];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <section className="space-y-6">
            {/* Encabezado */}
            <header className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight">
                    Lista de expedientes
                </h1>
                <p className="text-sm text-slate-500">
                    Resumen general de expedientes, estados y actividad reciente del
                    sistema DICRI.
                </p>
            </header>

            {/* Métricas arriba */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {metricCards.map((card) => (
                    <div
                        key={card.key}
                        className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-4 flex flex-col justify-between hover:shadow-md hover:-translate-y-[1px] transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                {card.label}
                            </p>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {card.count} registros
              </span>
                        </div>
                        <div className="mt-3 flex items-baseline justify-between gap-2">
              <span className="text-2xl font-semibold text-slate-900">
                {card.count}
              </span>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tarjeta principal */}
            <div className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
                {/* Tabs + filtros */}
                <div className="px-4 py-3 border-b border-slate-200/70 space-y-3">
                    {/* Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        {tabs.map((tab) => {
                            const active = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                                        active
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    <span
                                        className={`min-w-[1.5rem] text-center rounded-full text-[11px] ${
                                            active
                                                ? "bg-white/15"
                                                : "bg-white text-slate-700 border border-slate-200"
                                        }`}
                                    >
                    {tab.badge}
                  </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Filtros */}
                    <div className="grid gap-2 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1.6fr)]">
                        <div className="relative">
                            <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white">
                                <option value="">Tipo de expediente</option>
                                <option>Robo</option>
                                <option>Daños</option>
                                <option>Otros</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="date"
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                                placeholder="Fecha inicio"
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                                placeholder="Fecha fin"
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Buscar por código, título o responsable..."
                                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 focus:bg-white"
                            />
                            <button className="hidden md:inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800 transition">
                                Nuevo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabla de expedientes */}
                <div className="overflow-x-auto text-sm">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                        <tr className="bg-slate-50">
                            <th className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200">
                                Código
                            </th>
                            <th className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200">
                                Título
                            </th>
                            <th className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200">
                                Estado
                            </th>
                            <th className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200">
                                Prioridad
                            </th>
                            <th className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200">
                                Responsable
                            </th>
                            <th className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200">
                                Creado
                            </th>
                            <th className="text-left text-xs font-medium text-slate-500 px-4 py-2 border-b border-slate-200">
                                Límite
                            </th>
                            <th className="w-10 border-b border-slate-200" />
                        </tr>
                        </thead>
                        <tbody>
                        {mockExpedientes.map((e, idx) => (
                            <tr
                                key={e.codigo}
                                className={`hover:bg-slate-50 transition ${
                                    idx !== mockExpedientes.length - 1
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
                                    {e.fecha_creacion}
                                </td>
                                <td className="px-4 py-2 text-xs text-slate-500">
                                    {e.fecha_limite}
                                </td>
                                <td className="px-4 py-2 text-right text-xs text-slate-400">
                                    ⋮
                                </td>
                            </tr>
                        ))}
                        {mockExpedientes.length === 0 && (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="px-4 py-6 text-center text-xs text-slate-500"
                                >
                                    No hay expedientes para los filtros seleccionados.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
