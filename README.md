# Dicri – Sistema de Gestión de Evidencias

Este repositorio contiene el proyecto desarrollado para la **prueba técnica**, implementando un sistema de gestión de evidencias con backend, frontend y scripts SQL.  
La solución está pensada para ejecutarse fácilmente mediante **Docker Compose**.

---

## 📁 Estructura del proyecto

```
.
├── .idea/          # Configuraciones del IDE
├── backend/        # API REST (Node.js, Express, MSSQL)
├── frontend/       # Aplicación web (SPA)
├── erp_diagram/    # Diagramas del sistema / DB
└── sql/            # Scripts SQL (DB, tablas, datos, SPs)
```

---

## 🛠️ Tecnologías utilizadas

### Backend
- Node.js
- Express
- MSSQL (driver `mssql`)
- JWT para autenticación
- Arquitectura organizada por capas (routes, controllers, services, repositories)

### Frontend
- SPA en JavaScript (estructura lista para consumir la API)

### Base de Datos
- SQL Server
- Tablas: usuarios, roles, expedientes, estados, bitácora, etc.
- Stored Procedures para manejo de expedientes.

---

## ⚙️ Variables de entorno del Backend (.env)

Estas credenciales se deben colocar en el archivo:

`backend/.env`

```
DB_SERVER=sqlserver
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=@dmin$1234
DB_DATABASE=dicri_evidencias
PORT=4000
JWT_SECRET=a43e23499369712020e6624edb5057eada562d478cf80747177adfeae82d6ca4
JWT_EXPIRES_IN=2h
```

> **Nota:** Estas credenciales están adaptadas para funcionar dentro del entorno Docker (la base de datos se expone como `sqlserver` entre contenedores).

---

## 🗄️ Scripts SQL

En la carpeta `/sql` encontrarás los siguientes archivos:

1. **01_create_database.sql**  
   Crea la base de datos `dicri_evidencias`.

2. **02_create_tables.sql**  
   Incluye tablas de: usuarios, roles, expedientes, estados, etc.

3. **03_seed_data.sql**  
   Inserta datos iniciales (roles, usuario administrador, estados).

4. **04_stored_procedures.sql**  
   Contiene SPs para registrar, actualizar y consultar expedientes.

Ejecuta estos scripts en orden sobre una instancia SQL Server si no usas Docker.

---

## 🐳 Ejecutar el proyecto con Docker

Desde la raíz del proyecto:

```bash
docker compose up -d --build
```

Esto levantará:

- **Backend** → http://localhost:4000
- **Frontend** → según configuración del Dockerfile
- **SQL Server** → Contenedor accesible como `sqlserver` puerto `1433`

Ver logs:

```bash
docker compose logs -f
```

Apagar servicios:

```bash
docker compose down
```

---

## ▶️ Ejecución manual sin Docker (opcional)

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ✨ Funcionalidades principales

- Autenticación con JWT
- Gestión de usuarios
- Gestión completa de expedientes
- Actualización y seguimiento de estados
- Registro de técnico asignado
- Manejo de fechas de registro, actualización y aprobación

---

## 📌 Notas finales

- El proyecto está preparado para entorno Docker, pero puede ejecutarse localmente.
- Los scripts SQL deben ejecutarse primero si decides no usar Docker.
- La estructura está organizada para que sea fácil de extender y mantener.

---

**Proyecto listo para evaluación y ejecución inmediata.**
