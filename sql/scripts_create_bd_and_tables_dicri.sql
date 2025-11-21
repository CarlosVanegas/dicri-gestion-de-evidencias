/* =========================================================
   1. CREAR BASE DE DATOS
   ========================================================= */
IF DB_ID('dicri_evidencias') IS NULL
BEGIN
    CREATE DATABASE dicri_evidencias;
END
GO

USE dicri_evidencias;
GO

/* =========================================================
   2. TABLA: roles
   ========================================================= */
IF OBJECT_ID('dbo.roles', 'U') IS NOT NULL
    DROP TABLE dbo.roles;
GO

CREATE TABLE dbo.roles (
    id_rol         INT IDENTITY(1,1) PRIMARY KEY,
    nombre         VARCHAR(50)  NOT NULL, -- TECNICO, COORDINADOR, ADMIN
    descripcion    VARCHAR(200) NULL,
    es_activo      BIT          NOT NULL DEFAULT 1
);
GO

ALTER TABLE dbo.roles
ADD CONSTRAINT UQ_roles_nombre UNIQUE (nombre);
GO

/* =========================================================
   3. TABLA: estados_expediente
   ========================================================= */
IF OBJECT_ID('dbo.estados_expediente', 'U') IS NOT NULL
    DROP TABLE dbo.estados_expediente;
GO

CREATE TABLE dbo.estados_expediente (
    id_estado     INT IDENTITY(1,1) PRIMARY KEY,
    codigo        VARCHAR(30)  NOT NULL, -- REGISTRADO, EN_REVISION, RECHAZADO, APROBADO
    descripcion   VARCHAR(150) NOT NULL
);
GO

ALTER TABLE dbo.estados_expediente
ADD CONSTRAINT UQ_estados_expediente_codigo UNIQUE (codigo);
GO

/* =========================================================
   4. TABLA: usuarios
   ========================================================= */
IF OBJECT_ID('dbo.usuarios', 'U') IS NOT NULL
    DROP TABLE dbo.usuarios;
GO

CREATE TABLE dbo.usuarios (
    id_usuario       INT IDENTITY(1,1) PRIMARY KEY,
    nombre_completo  VARCHAR(150) NOT NULL,
    usuario          VARCHAR(50)  NOT NULL,     -- username login
    email            VARCHAR(150) NULL,
    password_hash    VARCHAR(255) NOT NULL,
    id_rol           INT          NOT NULL,
    activo           BIT          NOT NULL DEFAULT 1,
    fecha_creacion   DATETIME2(0) NOT NULL DEFAULT SYSDATETIME()
);
GO

ALTER TABLE dbo.usuarios
ADD CONSTRAINT UQ_usuarios_usuario UNIQUE (usuario);
GO

ALTER TABLE dbo.usuarios
ADD CONSTRAINT FK_usuarios_roles
FOREIGN KEY (id_rol) REFERENCES dbo.roles (id_rol);
GO

/* =========================================================
   5. TABLA: expedientes
   ========================================================= */
IF OBJECT_ID('dbo.expedientes', 'U') IS NOT NULL
    DROP TABLE dbo.expedientes;
GO

CREATE TABLE dbo.expedientes (
    id_expediente              INT IDENTITY(1,1) PRIMARY KEY,
    codigo_expediente          VARCHAR(30)   NOT NULL,   -- Ej: DICRI-2025-000123
    titulo                     VARCHAR(200)  NULL,
    descripcion                VARCHAR(500)  NULL,
    fecha_registro             DATETIME2(0)  NOT NULL DEFAULT SYSDATETIME(),
    id_tecnico_registra        INT           NOT NULL,
    id_estado_actual           INT           NOT NULL,
    fecha_ultima_actualizacion DATETIME2(0)  NOT NULL DEFAULT SYSDATETIME(),
    fecha_aprobacion           DATETIME2(0)  NULL        -- se llena al aprobar
);
GO

ALTER TABLE dbo.expedientes
ADD CONSTRAINT UQ_expedientes_codigo UNIQUE (codigo_expediente);
GO

ALTER TABLE dbo.expedientes
ADD CONSTRAINT FK_expedientes_tecnico
FOREIGN KEY (id_tecnico_registra) REFERENCES dbo.usuarios (id_usuario);
GO

ALTER TABLE dbo.expedientes
ADD CONSTRAINT FK_expedientes_estado
FOREIGN KEY (id_estado_actual) REFERENCES dbo.estados_expediente (id_estado);
GO

/* Index útil para reportes por estado y fecha */
CREATE INDEX IX_expedientes_estado_fecha
    ON dbo.expedientes (id_estado_actual, fecha_registro);
GO

/* =========================================================
   6. TABLA: indicios
   ========================================================= */
IF OBJECT_ID('dbo.indicios', 'U') IS NOT NULL
    DROP TABLE dbo.indicios;
GO

CREATE TABLE dbo.indicios (
    id_indicio          INT IDENTITY(1,1) PRIMARY KEY,
    id_expediente       INT           NOT NULL,
    descripcion         VARCHAR(500)  NOT NULL,
    tipo_objeto         VARCHAR(100)  NULL,   -- arma, prenda, vehículo, etc.
    color               VARCHAR(50)   NULL,
    tamano              VARCHAR(100)  NULL,   -- texto libre: "20 cm", "1.5 m", etc.
    peso                DECIMAL(10,2) NULL,   -- define si usas gramos o kg
    ubicacion           VARCHAR(200)  NULL,   -- donde se encontró o se resguarda
    id_tecnico_registra INT           NOT NULL,
    fecha_registro      DATETIME2(0)  NOT NULL DEFAULT SYSDATETIME()
);
GO

ALTER TABLE dbo.indicios
ADD CONSTRAINT FK_indicios_expedientes
FOREIGN KEY (id_expediente) REFERENCES dbo.expedientes (id_expediente);
GO

ALTER TABLE dbo.indicios
ADD CONSTRAINT FK_indicios_tecnico
FOREIGN KEY (id_tecnico_registra) REFERENCES dbo.usuarios (id_usuario);
GO

/* Índice para consultas por expediente */
CREATE INDEX IX_indicios_expediente
    ON dbo.indicios (id_expediente);
GO

/* =========================================================
   7. TABLA: revisiones_expediente
   ========================================================= */
IF OBJECT_ID('dbo.revisiones_expediente', 'U') IS NOT NULL
    DROP TABLE dbo.revisiones_expediente;
GO

CREATE TABLE dbo.revisiones_expediente (
    id_revision    INT IDENTITY(1,1) PRIMARY KEY,
    id_expediente  INT           NOT NULL,
    id_coordinador INT           NOT NULL,
    fecha_revision DATETIME2(0)  NOT NULL DEFAULT SYSDATETIME(),
    accion         VARCHAR(20)   NOT NULL,   -- 'APROBADO' o 'RECHAZADO'
    justificacion  VARCHAR(1000) NULL        -- obligatoria cuando es RECHAZADO
);
GO

ALTER TABLE dbo.revisiones_expediente
ADD CONSTRAINT FK_revexpediente_expedientes
FOREIGN KEY (id_expediente) REFERENCES dbo.expedientes (id_expediente);
GO

ALTER TABLE dbo.revisiones_expediente
ADD CONSTRAINT FK_revexpediente_coordinador
FOREIGN KEY (id_coordinador) REFERENCES dbo.usuarios (id_usuario);
GO

/* CHECK: si la acción es RECHAZADO, la justificación no puede ser vacía */
ALTER TABLE dbo.revisiones_expediente
ADD CONSTRAINT CK_revexpediente_justificacion
CHECK (
    (accion = 'RECHAZADO' AND justificacion IS NOT NULL AND LTRIM(RTRIM(justificacion)) <> '')
    OR (accion = 'APROBADO')
);
GO

/* Índice para reportes por fecha y acción */
CREATE INDEX IX_revexpediente_fecha_accion
    ON dbo.revisiones_expediente (fecha_revision, accion);
GO

/* =========================================================
   8. DATOS INICIALES (OPCIONAL PERO RECOMENDADO)
   ========================================================= */

-- Roles básicos
IF NOT EXISTS (SELECT 1 FROM dbo.roles)
BEGIN
    INSERT INTO dbo.roles (nombre, descripcion)
    VALUES
        ('TECNICO',    'Usuario encargado de registrar expedientes e indicios'),
        ('COORDINADOR','Usuario encargado de revisar, aprobar o rechazar expedientes'),
        ('ADMIN',      'Administrador del sistema con permisos completos');
END
GO

-- Estados básicos de expediente
IF NOT EXISTS (SELECT 1 FROM dbo.estados_expediente)
BEGIN
    INSERT INTO dbo.estados_expediente (codigo, descripcion)
    VALUES
        ('REGISTRADO', 'Expediente registrado por técnico'),
        ('EN_REVISION','Expediente enviado a revisión por coordinador'),
        ('RECHAZADO',  'Expediente rechazado, requiere correcciones'),
        ('APROBADO',   'Expediente aprobado y finalizado');
END
GO

/* =========================================================
   9. (Opcional) Usuario admin inicial de prueba
   ========================================================= */

IF NOT EXISTS (SELECT 1 FROM dbo.usuarios WHERE usuario = 'admin')
BEGIN
    DECLARE @idRolAdmin INT;
    SELECT @idRolAdmin = id_rol FROM dbo.roles WHERE nombre = 'ADMIN';

    INSERT INTO dbo.usuarios (nombre_completo, usuario, email, password_hash, id_rol)
    VALUES (
        'Administrador del Sistema',
        'admin',
        'admin@dicri.local',
        'CAMBIA_ESTE_HASH_EN_BACKEND', -- aquí luego pones el hash real con bcrypt
        @idRolAdmin
    );
END
GO


-- Tabla  para justificaciones de rechazo (si aún no existe)
CREATE TABLE dbo.rechazos_expediente (
                                         id_rechazo        INT IDENTITY PRIMARY KEY,
                                         id_expediente     INT NOT NULL
                                             CONSTRAINT FK_rechazos_expediente_expedientes
                                                 REFERENCES dbo.expedientes,
                                         id_usuario_coord  INT NOT NULL
                                             CONSTRAINT FK_rechazos_expediente_usuarios
                                                 REFERENCES dbo.usuarios,
                                         justificacion     VARCHAR(1000) NOT NULL,
                                         fecha_rechazo     DATETIME2(0) NOT NULL DEFAULT SYSDATETIME()
);
GO