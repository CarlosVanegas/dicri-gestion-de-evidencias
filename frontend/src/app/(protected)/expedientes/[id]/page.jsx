"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import {
    getExpediente,
    aprobarExpediente,
    rechazarExpediente,
} from "../../../../lib/expedientes.api";
import { AuthContext } from "../../../../context/AuthContext";

export default function ExpedienteDetallePage() {
    const params = useParams();
    const { user } = useContext(AuthContext);
    const [expediente, setExpediente] = useState(null);
    const [indicios, setIndicios] = useState([]);

    useEffect(() => {
        if (!params?.id) return;
        getExpediente(params.id)
            .then((data) => {
                setExpediente(data.expediente);
                setIndicios(data.indicios || []);
            })
            .catch(console.error);
    }, [params]);

    if (!expediente) {
        return <p>Cargando expediente...</p>;
    }

    const puedeAprobar = user?.rol === "COORDINADOR";

    const handleAprobar = async () => {
        await aprobarExpediente(expediente.id_expediente);
        alert("Expediente aprobado");
    };

    const handleRechazar = async () => {
        const justificacion = window.prompt("Ingrese justificación del rechazo:");
        if (!justificacion) return;
        await rechazarExpediente(expediente.id_expediente, justificacion);
        alert("Expediente rechazado");
    };

    return (
        <section className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">
                    Expediente {expediente.codigo_expediente}
                </h2>
                <p className="text-sm mb-1">
                    <strong>Título: </strong>
                    {expediente.titulo}
                </p>
                <p className="text-sm mb-1">
                    <strong>Estado: </strong>
                    {expediente.estado_nombre}
                </p>
                <p className="text-sm">
                    <strong>Descripción: </strong>
                    {expediente.descripcion}
                </p>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Indicios</h3>
                {indicios.length === 0 ? (
                    <p className="text-sm">No hay indicios registrados.</p>
                ) : (
                    <ul className="space-y-1 text-sm">
                        {indicios.map((i) => (
                            <li key={i.id_indicio}>
                                • {i.descripcion} ({i.ubicacion || "Sin ubicación"})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {puedeAprobar && (
                <div className="flex gap-2">
                    <button
                        onClick={handleAprobar}
                        className="bg-green-600 text-white px-4 py-2 rounded text-sm"
                    >
                        Aprobar
                    </button>
                    <button
                        onClick={handleRechazar}
                        className="bg-red-600 text-white px-4 py-2 rounded text-sm"
                    >
                        Rechazar
                    </button>
                </div>
            )}
        </section>
    );
}
