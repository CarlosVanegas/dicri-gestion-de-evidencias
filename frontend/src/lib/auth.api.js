import api from "./apiClient";

export const loginRequest = (usuario, password) =>
    api.post("/auth/login", { usuario, password }).then((res) => res.data);
