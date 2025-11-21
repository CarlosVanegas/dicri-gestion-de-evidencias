# Backend – Dicri Sistema de Gestión de Evidencias

Este backend implementa la **API REST** para el sistema de gestión de evidencias utilizado en la prueba técnica.

Provee endpoints para:

- Autenticación de usuarios (login)
- Gestión de usuarios
- Gestión de expedientes
- Catálogos básicos (roles, estados, etc.)

---

## 🛠️ Tecnologías

- Node.js
- Express
- MSSQL (`mssql`)
- JSON Web Tokens (JWT)
- Dotenv para manejo de variables de entorno

---

## 📁 Estructura principal

```text
backend/
├── src/
│   ├── config/          # Configuración general (DB, entorno)
│   ├── routes/          # Definición de rutas de la API
│   ├── controllers/     # Controladores: reciben la request y responden
│   ├── services/        # Lógica de negocio
│   ├── repositories/    # Acceso a datos (consultas a SQL Server)
│   ├── middlewares/     # Autenticación, validaciones, manejo de errores
│   └── app.js / server.ts
├── package.json
├── Dockerfile
└── ...
```

> Los nombres exactos de archivos pueden variar ligeramente, pero la idea de capas (routes → controllers → services → repositories) se mantiene.

---

## ⚙️ Variables de entorno

Crear el archivo `.env` dentro de la carpeta `backend/` con el siguiente contenido:

```env
DB_SERVER=sqlserver
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=@dmin$1234
DB_DATABASE=dicri_evidencias
PORT=4000
JWT_SECRET=a43e23499369712020e6624edb5057eada562d478cf80747177adfeae82d6ca4
JWT_EXPIRES_IN=2h
```

- `DB_SERVER`: nombre del host de SQL Server (en Docker es `sqlserver`).
- `DB_PORT`: puerto de SQL Server (1433 por defecto).
- `DB_USER` / `DB_PASSWORD`: credenciales del usuario de base de datos.
- `DB_DATABASE`: nombre de la base de datos.
- `PORT`: puerto donde escucha la API.
- `JWT_SECRET`: clave privada para firmar tokens.
- `JWT_EXPIRES_IN`: tiempo de expiración de los tokens.

---

## 🚀 Puesta en marcha (sin Docker)

1. Ir a la carpeta del backend:

   ```bash
   cd backend
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Asegurarse de que la base de datos `dicri_evidencias` existe y de que se han ejecutado los scripts de la carpeta `/sql`.

4. Ejecutar en modo desarrollo:

   ```bash
   npm run dev
   ```

5. La API estará disponible en:

   ```
   http://localhost:4000/api
   ```

   (o el prefijo configurado en el proyecto)

---

## 🐳 Ejecución con Docker

El backend está preparado para levantarse mediante `docker-compose` desde la raíz del proyecto.

1. Desde la raíz (donde está `docker-compose.yml`):

   ```bash
   docker compose up -d --build
   ```

2. El servicio del backend se levantará en el puerto 4000 (mapeado desde el contenedor).

   ```
   http://localhost:4000/api
   ```

3. Para ver logs solo del backend:

   ```bash
   docker compose logs -f backend
   ```

   (el nombre del servicio puede variar según el `docker-compose.yml`)

---

## 🔐 Autenticación

La API usa **JWT**:

1. El usuario se autentica en el endpoint de login.
2. El backend devuelve un token firmado con `JWT_SECRET`.
3. Para consumir endpoints protegidos, se debe mandar el token en el header:

   ```http
   Authorization: Bearer <token>
   ```

4. El middleware de autenticación valida el token y permite o bloquea el acceso.

---

## 📚 Endpoints principales (resumen)

> Los paths concretos pueden ajustarse, pero la estructura general es similar a:

- `POST /api/auth/login`  
  Autentica al usuario y devuelve un JWT.

- `GET /api/usuarios`  
  Lista usuarios (requiere rol autorizado).

- `POST /api/usuarios`  
  Crea un nuevo usuario.

- `GET /api/expedientes`  
  Lista expedientes con filtros básicos.

- `POST /api/expedientes`  
  Crea un expediente nuevo.

- `GET /api/expedientes/:id`  
  Obtiene el detalle de un expediente.

- `PUT /api/expedientes/:id`  
  Actualiza datos de un expediente o su estado.

---

## 🧪 Pruebas

Si el proyecto incluye tests:

```bash
npm test
```

Revisar `package.json` para ver el comando de pruebas configurado.

---

## 📌 Notas

- El backend asume que la estructura de tablas y stored procedures fue creada previamente usando los scripts de la carpeta `/sql`.
- La arquitectura por capas facilita extender la lógica (nuevos endpoints, nuevas entidades) sin romper el código existente.
