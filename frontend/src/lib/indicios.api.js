import api from "./apiClient";

export const crearIndicio = (idExpediente, data) =>
    api
        .post(`/expedientes/${idExpediente}/indicios`, data)
        .then((res) => res.data);
