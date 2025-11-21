# Frontend – Dicri Sistema de Gestión de Evidencias

Este proyecto corresponde al **frontend** de la prueba técnica.  
Es una aplicación web que consume la API del backend y permite gestionar usuarios y expedientes de forma visual.

---

## 🛠️ Tecnologías

- JavaScript / TypeScript
- Framework SPA (por ejemplo React o similar)
- Consumo de la API REST del backend mediante fetch/axios
- Manejo de estado y rutas de aplicación (según el framework escogido)

---

## 📁 Estructura principal

```text
frontend/
├── src/
│   ├── components/    # Componentes reutilizables de UI
│   ├── pages/         # Páginas (Login, Dashboard, Expedientes, Usuarios)
│   ├── services/      # Cliente HTTP para la API (axios/fetch)
│   ├── hooks/         # Hooks personalizados (si aplica)
│   ├── assets/        # Estilos, imágenes, íconos
│   └── main.(js|tsx)  # Punto de entrada
├── public/
├── package.json
├── Dockerfile
└── ...
```

> Los nombres exactos pueden cambiar, pero esta es la idea general de organización.

---

## 🔗 Configuración de la URL de la API

Normalmente se utiliza un archivo `.env` en `frontend/` para definir la URL base del backend.

Ejemplo:

```env
VITE_API_URL=http://localhost:4000/api
# o
REACT_APP_API_URL=http://localhost:4000/api
```

> Ajustar según el bundler/framework (Vite, CRA, Next, etc.).

---

## 🚀 Puesta en marcha (sin Docker)

1. Ir a la carpeta del frontend:

   ```bash
   cd frontend
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env` (si aplica) con la URL de la API.

4. Ejecutar en modo desarrollo:

   ```bash
   npm run dev
   ```

5. La aplicación quedará disponible en el puerto configurado por el framework, por ejemplo:

   ```
   http://localhost:5173
   ```
   o
   ```
   http://localhost:3000
   ```

---

## 🐳 Ejecución con Docker

Desde la **raíz** del proyecto (donde está el `docker-compose.yml`):

```bash
docker compose up -d --build
```

El contenedor del frontend se levantará en el puerto que esté mapeado en `docker-compose.yml` (ej. 3000 o 8080).

Para ver solo los logs del frontend:

```bash
docker compose logs -f frontend
```

(el nombre del servicio puede variar según la configuración)

---

## 🧩 Funcionalidades principales

- **Pantalla de Login**
    - Campo de usuario y contraseña.
    - Envío de credenciales a la API de backend.
    - Almacenamiento del token JWT (ej. en localStorage) para futuras peticiones.

- **Dashboard inicial**
    - Resumen de expedientes o métricas básicas.

- **Gestión de expedientes**
    - Listado de expedientes paginado/filtrado.
    - Creación/edición de expedientes mediante formularios.
    - Visualización del detalle de un expediente.
    - Cambio de estado (por ejemplo: registrado, en revisión, aprobado).

- **Gestión de usuarios**
    - Listado de usuarios.
    - Creación/edición básica (según permisos).

---

## 🔐 Integración con autenticación

- El frontend toma el token devuelto por el backend en el login.
- Para cada petición protegida, envía el header:

  ```http
  Authorization: Bearer <token>
  ```

- Si el token expira, se redirige al usuario a la pantalla de login.

---

## 📌 Notas

- El frontend asume que el backend está levantado y accesible en la URL definida en el `.env`.
- El diseño y componentes pueden adaptarse fácilmente a otro tema visual sin afectar la lógica de integración con la API.
