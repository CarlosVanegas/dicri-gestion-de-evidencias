import api from "./apiClient";

export const getExpedientes = () =>
    api.get("/expedientes").then((res) => res.data);

export const getExpediente = (id) =>
    api.get(`/expedientes/${id}`).then((res) => res.data);

export const crearExpediente = (data) =>
    api.post("/expedientes", data).then((res) => res.data);

export const aprobarExpediente = (id) =>
    api.post(`/expedientes/${id}/aprobar`).then((res) => res.data);

export const rechazarExpediente = (id, justificacion) =>
    api.post(`/expedientes/${id}/rechazar`, { justificacion }).then(
        (res) => res.data
    );
