"use client";

import { useEffect, useState } from "react";
import { getExpedientes } from "../../../lib/expedientes.api";
import Link from "next/link";

export default function ExpedientesPage() {
    const [expedientes, setExpedientes] = useState([]);

    useEffect(() => {
        getExpedientes().then(setExpedientes).catch(console.error);
    }, []);

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Expedientes</h2>
            <table className="w-full bg-white shadow rounded overflow-hidden text-sm">
                <thead className="bg-slate-200">
                <tr>
                    <th className="px-3 py-2 text-left">Código</th>
                    <th className="px-3 py-2 text-left">Título</th>
                    <th className="px-3 py-2 text-left">Estado</th>
                    <th className="px-3 py-2 text-left">Fecha registro</th>
                    <th className="px-3 py-2"></th>
                </tr>
                </thead>
                <tbody>
                {expedientes.map((e) => (
                    <tr key={e.id_expediente} className="border-t">
                        <td className="px-3 py-2">{e.codigo_expediente}</td>
                        <td className="px-3 py-2">{e.titulo}</td>
                        <td className="px-3 py-2">{e.estado_nombre}</td>
                        <td className="px-3 py-2">{e.fecha_registro}</td>
                        <td className="px-3 py-2 text-right">
                            <Link
                                href={`/expedientes/${e.id_expediente}`}
                                className="text-blue-600 text-xs"
                            >
                                Ver detalle
                            </Link>
                        </td>
                    </tr>
                ))}
                {expedientes.length === 0 && (
                    <tr>
                        <td className="px-3 py-4 text-center" colSpan={5}>
                            No hay expedientes aún.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </section>
    );
}
