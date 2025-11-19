# Proyecto Dicri - Gestión de Evidencias

Este proyecto es una aplicación **Full Stack** desarrollada con:

- **Backend:** Node.js + Express + SQL Server
- **Frontend:** Next.js + React + Tailwind CSS
- **Base de Datos:** SQL Server 2022 (Docker)
- **Contenedores:** Docker + Docker Compose

## 📦 Estructura del Proyecto

```
dicri-gestion-de-evidencias/
│   docker-compose.yaml
│   README.md
│
├── backend/
│   ├── Dockerfile
│   ├── .env.docker
│   ├── package.json
│   ├── src/
│   └── README.md
│
└── frontend/
    ├── Dockerfile
    ├── .env.docker
    ├── package.json
    ├── src/
    └── README.md
```

---

## 🚀 Levantar todo el proyecto

Desde la **raíz del proyecto**:

```bash
docker compose up -d --build
```

Esto levantará:

- **Backend** → http://localhost:4000  
- **Frontend** → http://localhost:3000  
- **SQL Server en Docker** → localhost,1433  

---

## 🗄️ Acceso a SQL Server

```
Server: localhost,1433
User: sa
Password: TuPassword123!
```

---

## 🖥️ Endpoints Backend (ejemplo)

| Método | Ruta | Descripción |
|--------|-------|-------------|
| GET | /api/db-test | Prueba de conexión a SQL Server |

---

## ⚙️ Variables de entorno

Cada servicio usa su propio archivo:

- `backend/.env.docker`
- `frontend/.env.docker`

---

## 👨‍💻 Autor

**Carlos Vanegas – Vanqode Solutions**
