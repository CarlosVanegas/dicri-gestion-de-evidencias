// src/lib/users.api.js
import api from "./apiClient";

// Normaliza la respuesta sin importar si el backend devuelve { usuarios } o un array directo
const normalizeList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.usuarios)) return data.usuarios;
    return [];
};

const normalizeOne = (data) => {
    if (data?.usuario) return data.usuario;
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
    // suponemos que el DELETE marca como inactivo
    const res = await api.delete(`/usuarios/${id_usuario}`);
    return res.data;
}
