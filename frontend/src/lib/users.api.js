// src/lib/users.api.js
import api from "./apiClient";

const normalizeList = (data) => {
    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.data)) return data.data;

    if (Array.isArray(data?.usuarios)) return data.usuarios;

    return [];
};

const normalizeOne = (data) => {
    if (data?.usuario) return data.usuario;
    if (data?.data) return data.data;
    return data;
};

export async function fetchUsers() {
    const res = await api.get("/usuarios");
    return normalizeList(res.data);
}

export async function createUser(payload) {
    const res = await api.post("/usuarios", payload);
    return normalizeOne(res.data);
}

export async function updateUser(id_usuario, payload) {
    const res = await api.put(`/usuarios/${id_usuario}`, payload);
    return normalizeOne(res.data);
}

export async function deactivateUser(id_usuario) {
    const res = await api.delete(`/usuarios/${id_usuario}`);
    return res.data;
}
