
------------------------------------------------------------
-- ROLES
------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_roles_listar
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id_rol,
        nombre,
        descripcion,
        es_activo
    FROM roles
    ORDER BY nombre;
END
GO

CREATE OR ALTER PROCEDURE sp_roles_obtener_por_id
    @id_rol INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id_rol,
        nombre,
        descripcion,
        es_activo
    FROM roles
    WHERE id_rol = @id_rol;
END
GO

CREATE OR ALTER PROCEDURE sp_roles_crear
    @nombre      VARCHAR(50),
    @descripcion VARCHAR(200) = NULL,
    @es_activo   BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO roles (nombre, descripcion, es_activo)
    VALUES (@nombre, @descripcion, @es_activo);

    SELECT 
        id_rol,
        nombre,
        descripcion,
        es_activo
    FROM roles
    WHERE id_rol = SCOPE_IDENTITY();
END
GO

CREATE OR ALTER PROCEDURE sp_roles_actualizar
    @id_rol      INT,
    @nombre      VARCHAR(50),
    @descripcion VARCHAR(200) = NULL,
    @es_activo   BIT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE roles
    SET 
        nombre = @nombre,
        descripcion = @descripcion,
        es_activo = @es_activo
    WHERE id_rol = @id_rol;

    SELECT 
        id_rol,
        nombre,
        descripcion,
        es_activo
    FROM roles
    WHERE id_rol = @id_rol;
END
GO

-- "Eliminar" rol = desactivarlo (evitamos problemas de FK)
CREATE OR ALTER PROCEDURE sp_roles_eliminar
    @id_rol INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE roles
    SET es_activo = 0
    WHERE id_rol = @id_rol;
END
GO

CREATE OR ALTER PROCEDURE sp_login_usuario
    @usuario VARCHAR(50)
AS
BEGIN
    SELECT 
        u.id_usuario,
        u.nombre_completo,
        u.usuario,
        u.email,
        u.password_hash,
        r.nombre AS rol
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE u.usuario = @usuario AND u.activo = 1
END
GO



------------------------------------------------------------
-- USUARIOS
------------------------------------------------------------

-- Listar usuarios (con nombre de rol)
CREATE OR ALTER PROCEDURE sp_usuarios_listar
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.id_usuario,
        u.nombre_completo,
        u.usuario,
        u.email,
        u.id_rol,
        r.nombre AS rol,
        u.activo,
        u.fecha_creacion
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    ORDER BY u.nombre_completo;
END
GO

-- Obtener usuario por id
CREATE OR ALTER PROCEDURE sp_usuarios_obtener_por_id
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.id_usuario,
        u.nombre_completo,
        u.usuario,
        u.email,
        u.id_rol,
        r.nombre AS rol,
        u.activo,
        u.fecha_creacion
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE u.id_usuario = @id_usuario;
END
GO

-- Crear usuario
CREATE OR ALTER PROCEDURE sp_usuarios_crear
    @nombre_completo VARCHAR(150),
    @usuario         VARCHAR(50),
    @email           VARCHAR(150) = NULL,
    @password_hash   VARCHAR(255),
    @id_rol          INT,
    @activo          BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO usuarios (nombre_completo, usuario, email, password_hash, id_rol, activo)
    VALUES (@nombre_completo, @usuario, @email, @password_hash, @id_rol, @activo);

    SELECT 
        u.id_usuario,
        u.nombre_completo,
        u.usuario,
        u.email,
        u.id_rol,
        r.nombre AS rol,
        u.activo,
        u.fecha_creacion
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE u.id_usuario = SCOPE_IDENTITY();
END
GO

-- Actualizar datos generales de usuario (no password)
CREATE OR ALTER PROCEDURE sp_usuarios_actualizar
    @id_usuario      INT,
    @nombre_completo VARCHAR(150),
    @email           VARCHAR(150) = NULL,
    @id_rol          INT,
    @activo          BIT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE usuarios
    SET 
        nombre_completo = @nombre_completo,
        email           = @email,
        id_rol          = @id_rol,
        activo          = @activo
    WHERE id_usuario = @id_usuario;

    SELECT 
        u.id_usuario,
        u.nombre_completo,
        u.usuario,
        u.email,
        u.id_rol,
        r.nombre AS rol,
        u.activo,
        u.fecha_creacion
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE u.id_usuario = @id_usuario;
END
GO

-- Actualizar password
CREATE OR ALTER PROCEDURE sp_usuarios_actualizar_password
    @id_usuario    INT,
    @password_hash VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE usuarios
    SET password_hash = @password_hash
    WHERE id_usuario = @id_usuario;
END
GO

-- "Eliminar" usuario = desactivarlo
CREATE OR ALTER PROCEDURE sp_usuarios_eliminar
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE usuarios
    SET activo = 0
    WHERE id_usuario = @id_usuario;
END
GO

-- LOGIN (se usará en tu repositorio)
CREATE OR ALTER PROCEDURE sp_usuarios_login
    @usuario VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.id_usuario,
        u.nombre_completo,
        u.usuario,
        u.email,
        u.password_hash,
        u.id_rol,
        u.activo
    FROM usuarios u
    WHERE u.usuario = @usuario;
END
GO



------------------------------------------------------------
-- ESTADOS_EXPEDIENTE
------------------------------------------------------------

-- Listar todos los estados
CREATE OR ALTER PROCEDURE sp_estados_listar
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        id_estado,
        codigo,
        descripcion
    FROM estados_expediente
    ORDER BY codigo;
END
GO

-- Obtener un estado por id
CREATE OR ALTER PROCEDURE sp_estados_obtener_por_id
    @id_estado INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        id_estado,
        codigo,
        descripcion
    FROM estados_expediente
    WHERE id_estado = @id_estado;
END
GO

-- (Opcional, útil a veces) Obtener por código
CREATE OR ALTER PROCEDURE sp_estados_obtener_por_codigo
    @codigo VARCHAR(30)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        id_estado,
        codigo,
        descripcion
    FROM estados_expediente
    WHERE codigo = @codigo;
END
GO

-- Crear estado
CREATE OR ALTER PROCEDURE sp_estados_crear
    @codigo       VARCHAR(30),
    @descripcion  VARCHAR(150)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO estados_expediente (codigo, descripcion)
    VALUES (@codigo, @descripcion);

    SELECT
        id_estado,
        codigo,
        descripcion
    FROM estados_expediente
    WHERE id_estado = SCOPE_IDENTITY();
END
GO

-- Actualizar estado
CREATE OR ALTER PROCEDURE sp_estados_actualizar
    @id_estado    INT,
    @codigo       VARCHAR(30),
    @descripcion  VARCHAR(150)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE estados_expediente
    SET
        codigo = @codigo,
        descripcion = @descripcion
    WHERE id_estado = @id_estado;

    SELECT
        id_estado,
        codigo,
        descripcion
    FROM estados_expediente
    WHERE id_estado = @id_estado;
END
GO

-- Eliminar estado
CREATE OR ALTER PROCEDURE sp_estados_eliminar
    @id_estado INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM estados_expediente
    WHERE id_estado = @id_estado;
END
GO


------------------------------------------------------------
-- EXPEDIENTES
------------------------------------------------------------

-- Crear expediente
CREATE OR ALTER PROCEDURE sp_expedientes_crear
    @codigo_expediente   VARCHAR(30),
    @titulo              VARCHAR(200) = NULL,
    @descripcion         VARCHAR(500) = NULL,
    @id_tecnico_registra INT,
    @id_estado_actual    INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO expedientes (
        codigo_expediente,
        titulo,
        descripcion,
        id_tecnico_registra,
        id_estado_actual
    )
    VALUES (
        @codigo_expediente,
        @titulo,
        @descripcion,
        @id_tecnico_registra,
        @id_estado_actual
    );

    SELECT 
        e.id_expediente,
        e.codigo_expediente,
        e.titulo,
        e.descripcion,
        e.fecha_registro,
        e.id_tecnico_registra,
        u.nombre_completo AS tecnico_nombre,
        e.id_estado_actual,
        est.codigo AS estado_codigo,
        est.descripcion AS estado_descripcion,
        e.fecha_ultima_actualizacion,
        e.fecha_aprobacion
    FROM expedientes e
    INNER JOIN usuarios u ON e.id_tecnico_registra = u.id_usuario
    INNER JOIN estados_expediente est ON e.id_estado_actual = est.id_estado
    WHERE e.id_expediente = SCOPE_IDENTITY();
END
GO

-- Listar expedientes (con filtros opcionales por fecha y estado)
CREATE OR ALTER PROCEDURE sp_expedientes_listar
    @fecha_inicio  DATETIME2(0) = NULL,
    @fecha_fin     DATETIME2(0) = NULL,
    @id_estado     INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        e.id_expediente,
        e.codigo_expediente,
        e.titulo,
        e.descripcion,
        e.fecha_registro,
        e.id_tecnico_registra,
        u.nombre_completo AS tecnico_nombre,
        e.id_estado_actual,
        est.codigo AS estado_codigo,
        est.descripcion AS estado_descripcion,
        e.fecha_ultima_actualizacion,
        e.fecha_aprobacion
    FROM expedientes e
    INNER JOIN usuarios u ON e.id_tecnico_registra = u.id_usuario
    INNER JOIN estados_expediente est ON e.id_estado_actual = est.id_estado
    WHERE
        (@fecha_inicio IS NULL OR e.fecha_registro >= @fecha_inicio)
        AND (@fecha_fin IS NULL OR e.fecha_registro <= @fecha_fin)
        AND (@id_estado IS NULL OR e.id_estado_actual = @id_estado)
    ORDER BY e.fecha_registro DESC;
END
GO

-- Obtener expediente por id (con info de técnico y estado)
CREATE OR ALTER PROCEDURE sp_expedientes_obtener_por_id
    @id_expediente INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        e.id_expediente,
        e.codigo_expediente,
        e.titulo,
        e.descripcion,
        e.fecha_registro,
        e.id_tecnico_registra,
        u.nombre_completo AS tecnico_nombre,
        e.id_estado_actual,
        est.codigo AS estado_codigo,
        est.descripcion AS estado_descripcion,
        e.fecha_ultima_actualizacion,
        e.fecha_aprobacion
    FROM expedientes e
    INNER JOIN usuarios u ON e.id_tecnico_registra = u.id_usuario
    INNER JOIN estados_expediente est ON e.id_estado_actual = est.id_estado
    WHERE e.id_expediente = @id_expediente;
END
GO

-- Actualizar datos generales del expediente (no estado)
CREATE OR ALTER PROCEDURE sp_expedientes_actualizar
    @id_expediente INT,
    @titulo        VARCHAR(200) = NULL,
    @descripcion   VARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE expedientes
    SET 
        titulo = @titulo,
        descripcion = @descripcion,
        fecha_ultima_actualizacion = SYSDATETIME()
    WHERE id_expediente = @id_expediente;

    EXEC sp_expedientes_obtener_por_id @id_expediente = @id_expediente;
END
GO

-- Cambiar estado del expediente (sin generar revisión)
CREATE OR ALTER PROCEDURE sp_expedientes_cambiar_estado
    @id_expediente   INT,
    @id_estado_nuevo INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE expedientes
    SET 
        id_estado_actual = @id_estado_nuevo,
        fecha_ultima_actualizacion = SYSDATETIME()
    WHERE id_expediente = @id_expediente;

    EXEC sp_expedientes_obtener_por_id @id_expediente = @id_expediente;
END
GO





------------------------------------------------------------
-- INDICIOS
------------------------------------------------------------

-- Crear indicio
CREATE OR ALTER PROCEDURE sp_indicios_crear
    @id_expediente       INT,
    @descripcion         VARCHAR(500),
    @tipo_objeto         VARCHAR(100) = NULL,
    @color               VARCHAR(50) = NULL,
    @tamano              VARCHAR(100) = NULL,
    @peso                DECIMAL(10, 2) = NULL,
    @ubicacion           VARCHAR(200) = NULL,
    @id_tecnico_registra INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO indicios (
        id_expediente,
        descripcion,
        tipo_objeto,
        color,
        tamano,
        peso,
        ubicacion,
        id_tecnico_registra
    )
    VALUES (
        @id_expediente,
        @descripcion,
        @tipo_objeto,
        @color,
        @tamano,
        @peso,
        @ubicacion,
        @id_tecnico_registra
    );

    SELECT 
        i.id_indicio,
        i.id_expediente,
        i.descripcion,
        i.tipo_objeto,
        i.color,
        i.tamano,
        i.peso,
        i.ubicacion,
        i.id_tecnico_registra,
        u.nombre_completo AS tecnico_nombre,
        i.fecha_registro
    FROM indicios i
    INNER JOIN usuarios u ON i.id_tecnico_registra = u.id_usuario
    WHERE i.id_indicio = SCOPE_IDENTITY();
END
GO

-- Listar indicios por expediente
CREATE OR ALTER PROCEDURE sp_indicios_listar_por_expediente
    @id_expediente INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        i.id_indicio,
        i.id_expediente,
        i.descripcion,
        i.tipo_objeto,
        i.color,
        i.tamano,
        i.peso,
        i.ubicacion,
        i.id_tecnico_registra,
        u.nombre_completo AS tecnico_nombre,
        i.fecha_registro
    FROM indicios i
    INNER JOIN usuarios u ON i.id_tecnico_registra = u.id_usuario
    WHERE i.id_expediente = @id_expediente
    ORDER BY i.fecha_registro;
END
GO

-- Obtener indicio por id
CREATE OR ALTER PROCEDURE sp_indicios_obtener_por_id
    @id_indicio INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        i.id_indicio,
        i.id_expediente,
        i.descripcion,
        i.tipo_objeto,
        i.color,
        i.tamano,
        i.peso,
        i.ubicacion,
        i.id_tecnico_registra,
        u.nombre_completo AS tecnico_nombre,
        i.fecha_registro
    FROM indicios i
    INNER JOIN usuarios u ON i.id_tecnico_registra = u.id_usuario
    WHERE i.id_indicio = @id_indicio;
END
GO

-- Actualizar indicio (no se cambia expediente ni técnico)
CREATE OR ALTER PROCEDURE sp_indicios_actualizar
    @id_indicio  INT,
    @descripcion VARCHAR(500),
    @tipo_objeto VARCHAR(100) = NULL,
    @color       VARCHAR(50) = NULL,
    @tamano      VARCHAR(100) = NULL,
    @peso        DECIMAL(10, 2) = NULL,
    @ubicacion   VARCHAR(200) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE indicios
    SET 
        descripcion = @descripcion,
        tipo_objeto = @tipo_objeto,
        color       = @color,
        tamano      = @tamano,
        peso        = @peso,
        ubicacion   = @ubicacion
    WHERE id_indicio = @id_indicio;

    EXEC sp_indicios_obtener_por_id @id_indicio = @id_indicio;
END
GO

-- Eliminar indicio
CREATE OR ALTER PROCEDURE sp_indicios_eliminar
    @id_indicio INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM indicios
    WHERE id_indicio = @id_indicio;
END
GO



------------------------------------------------------------
-- REVISIONES_EXPEDIENTE
------------------------------------------------------------

-- Crear revisión (APROBADO / RECHAZADO) y actualizar estado del expediente
CREATE OR ALTER PROCEDURE sp_revisiones_crear
    @id_expediente  INT,
    @id_coordinador INT,
    @accion         VARCHAR(20),      -- 'APROBADO' o 'RECHAZADO'
    @justificacion  VARCHAR(1000) = NULL,
    @id_estado_nuevo INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRAN;

        INSERT INTO revisiones_expediente (
            id_expediente,
            id_coordinador,
            accion,
            justificacion
        )
        VALUES (
            @id_expediente,
            @id_coordinador,
            @accion,
            @justificacion
        );

        -- Actualizar estado del expediente
        UPDATE expedientes
        SET 
            id_estado_actual = @id_estado_nuevo,
            fecha_ultima_actualizacion = SYSDATETIME(),
            fecha_aprobacion = CASE 
                                   WHEN @accion = 'APROBADO' THEN SYSDATETIME()
                                   ELSE fecha_aprobacion
                               END
        WHERE id_expediente = @id_expediente;

        COMMIT TRAN;

        -- Devolvemos la revisión creada
        SELECT 
            r.id_revision,
            r.id_expediente,
            r.id_coordinador,
            u.nombre_completo AS coordinador_nombre,
            r.fecha_revision,
            r.accion,
            r.justificacion
        FROM revisiones_expediente r
        INNER JOIN usuarios u ON r.id_coordinador = u.id_usuario
        WHERE r.id_revision = SCOPE_IDENTITY();
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRAN;

        THROW;
    END CATCH
END
GO

-- Listar revisiones por expediente
CREATE OR ALTER PROCEDURE sp_revisiones_listar_por_expediente
    @id_expediente INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        r.id_revision,
        r.id_expediente,
        r.id_coordinador,
        u.nombre_completo AS coordinador_nombre,
        r.fecha_revision,
        r.accion,
        r.justificacion
    FROM revisiones_expediente r
    INNER JOIN usuarios u ON r.id_coordinador = u.id_usuario
    WHERE r.id_expediente = @id_expediente
    ORDER BY r.fecha_revision DESC;
END
GO




------------------------------------------------------------
-- REPORTES: Registros, Aprobaciones y Rechazos
------------------------------------------------------------

CREATE OR ALTER PROCEDURE sp_reporte_resumen_registros_aprobaciones_rechazos
    @fecha_inicio DATETIME2(0),
    @fecha_fin    DATETIME2(0)
AS
BEGIN
    SET NOCOUNT ON;

    -- Registros de expedientes
    SELECT 
        'REGISTROS' AS tipo,
        COUNT(*)    AS total
    FROM expedientes
    WHERE fecha_registro BETWEEN @fecha_inicio AND @fecha_fin

    UNION ALL

    -- Aprobaciones
    SELECT 
        'APROBACIONES' AS tipo,
        COUNT(*)       AS total
    FROM revisiones_expediente
    WHERE accion = 'APROBADO'
      AND fecha_revision BETWEEN @fecha_inicio AND @fecha_fin

    UNION ALL

    -- Rechazos
    SELECT 
        'RECHAZOS' AS tipo,
        COUNT(*)   AS total
    FROM revisiones_expediente
    WHERE accion = 'RECHAZADO'
      AND fecha_revision BETWEEN @fecha_inicio AND @fecha_fin;
END
GO




CREATE OR ALTER PROCEDURE dbo.sp_GetUsuarioByUsuario
    @usuario VARCHAR(100)
    AS
BEGIN
    SET NOCOUNT ON;

SELECT
    u.id_usuario,
    u.nombre_completo,
    u.usuario,
    u.email,
    u.password_hash,
    u.id_rol,
    u.activo,
    r.nombre AS rol_nombre
FROM dbo.usuarios u
         INNER JOIN dbo.roles r
                    ON u.id_rol = r.id_rol
WHERE u.usuario = @usuario;
END;
GO
