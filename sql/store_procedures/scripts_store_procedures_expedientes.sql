--------------------------------------------------
-- Listar expedientes
--------------------------------------------------
CREATE OR ALTER PROCEDURE sp_expedientes_listar
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
        u.nombre_completo AS tecnico_registra,
        e.id_estado_actual,
        est.codigo      AS estado_codigo,
        est.descripcion AS estado_descripcion,
        e.fecha_ultima_actualizacion,
        e.fecha_aprobacion
    FROM expedientes e
    INNER JOIN usuarios u
        ON e.id_tecnico_registra = u.id_usuario
    INNER JOIN estados_expediente est
        ON e.id_estado_actual = est.id_estado
    ORDER BY e.fecha_registro DESC;
END
GO

--------------------------------------------------
-- Obtener expediente por ID
--------------------------------------------------
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
        u.nombre_completo AS tecnico_registra,
        e.id_estado_actual,
        est.codigo      AS estado_codigo,
        est.descripcion AS estado_descripcion,
        e.fecha_ultima_actualizacion,
        e.fecha_aprobacion
    FROM expedientes e
    INNER JOIN usuarios u
        ON e.id_tecnico_registra = u.id_usuario
    INNER JOIN estados_expediente est
        ON e.id_estado_actual = est.id_estado
    WHERE e.id_expediente = @id_expediente;
END
GO

--------------------------------------------------
-- Crear expediente
--------------------------------------------------
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

    DECLARE @new_id INT = SCOPE_IDENTITY();

    EXEC sp_expedientes_obtener_por_id @id_expediente = @new_id;
END
GO

--------------------------------------------------
-- Actualizar expediente (datos generales)
--------------------------------------------------
CREATE OR ALTER PROCEDURE sp_expedientes_actualizar
    @id_expediente      INT,
    @titulo             VARCHAR(200) = NULL,
    @descripcion        VARCHAR(500) = NULL,
    @id_estado_actual   INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE expedientes
    SET
        titulo                     = @titulo,
        descripcion                = @descripcion,
        id_estado_actual           = @id_estado_actual,
        fecha_ultima_actualizacion = SYSDATETIME()
    WHERE id_expediente = @id_expediente;

    EXEC sp_expedientes_obtener_por_id @id_expediente = @id_expediente;
END
GO





CREATE OR ALTER PROCEDURE dbo.sp_InsertIndicio
    @id_expediente       INT,
    @descripcion         VARCHAR(500),
    @color               VARCHAR(100) = NULL,
    @tamano              VARCHAR(100) = NULL,
    @peso                DECIMAL(18, 2) = NULL,
    @ubicacion           VARCHAR(200) = NULL,
    @id_tecnico_registra INT,
    @id_indicio_nuevo    INT OUTPUT
    AS
BEGIN
    SET NOCOUNT ON;

BEGIN TRY
INSERT INTO dbo.indicios (
            id_expediente,
            descripcion,
            color,
            tamano,
            peso,
            ubicacion,
            id_tecnico_registra
        )
        VALUES (
            @id_expediente,
            @descripcion,
            @color,
            @tamano,
            @peso,
            @ubicacion,
            @id_tecnico_registra
        );

        SET @id_indicio_nuevo = SCOPE_IDENTITY();
END TRY
BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR('Error en sp_InsertIndicio: %s', 16, 1, @ErrorMessage);
        RETURN;
END CATCH
END;
GO


CREATE OR ALTER PROCEDURE dbo.sp_UpdateIndicio
    @id_indicio    INT,
    @descripcion   VARCHAR(500),
    @color         VARCHAR(100) = NULL,
    @tamano        VARCHAR(100) = NULL,
    @peso          DECIMAL(18, 2) = NULL,
    @ubicacion     VARCHAR(200) = NULL
    AS
BEGIN
    SET NOCOUNT ON;

BEGIN TRY
UPDATE dbo.indicios
SET descripcion = @descripcion,
    color       = @color,
    tamano      = @tamano,
    peso        = @peso,
    ubicacion   = @ubicacion
WHERE id_indicio = @id_indicio;
END TRY
BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR('Error en sp_UpdateIndicio: %s', 16, 1, @ErrorMessage);
        RETURN;
END CATCH
END;
GO



CREATE OR ALTER PROCEDURE dbo.sp_DeleteIndicio
    @id_indicio INT
    AS
BEGIN
    SET NOCOUNT ON;

BEGIN TRY
DELETE FROM dbo.indicios
WHERE id_indicio = @id_indicio;
END TRY
BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR('Error en sp_DeleteIndicio: %s', 16, 1, @ErrorMessage);
        RETURN;
END CATCH
END;
GO



CREATE OR ALTER PROCEDURE dbo.sp_GetIndicioById
    @id_indicio INT
    AS
BEGIN
    SET NOCOUNT ON;

SELECT
    i.id_indicio,
    i.id_expediente,
    i.descripcion,
    i.color,
    i.tamano,
    i.peso,
    i.ubicacion,
    i.fecha_registro,
    i.id_tecnico_registra,
    u.nombre_completo AS tecnico_nombre
FROM dbo.indicios i
         INNER JOIN dbo.usuarios u
                    ON i.id_tecnico_registra = u.id_usuario
WHERE i.id_indicio = @id_indicio;
END;
GO

CREATE OR ALTER PROCEDURE dbo.sp_GetIndiciosByExpediente
    @id_expediente INT
    AS
BEGIN
    SET NOCOUNT ON;

SELECT
    i.id_indicio,
    i.descripcion,
    i.color,
    i.tamano,
    i.peso,
    i.ubicacion,
    i.fecha_registro,
    i.id_tecnico_registra,
    u.nombre_completo AS tecnico_nombre
FROM dbo.indicios i
         INNER JOIN dbo.usuarios u
                    ON i.id_tecnico_registra = u.id_usuario
WHERE i.id_expediente = @id_expediente
ORDER BY i.fecha_registro ASC;
END;
GO


CREATE OR ALTER PROCEDURE dbo.sp_AprobarExpediente
    @id_expediente INT,
    @id_usuario_coordinador INT
    AS
BEGIN
    SET NOCOUNT ON;

BEGIN TRY
UPDATE dbo.expedientes
SET id_estado_actual           = 3,          -- Aprobado
    fecha_ultima_actualizacion = SYSDATETIME(),
    fecha_aprobacion           = SYSDATETIME()
WHERE id_expediente = @id_expediente;
END TRY
BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR('Error en sp_AprobarExpediente: %s', 16, 1, @ErrorMessage);
        RETURN;
END CATCH
END;
GO




CREATE OR ALTER PROCEDURE dbo.sp_RechazarExpediente
    @id_expediente        INT,
    @id_usuario_coordinador INT,
    @justificacion        VARCHAR(1000)
    AS
BEGIN
    SET NOCOUNT ON;

BEGIN TRY
        -- Actualizar estado del expediente
UPDATE dbo.expedientes
SET id_estado_actual           = 4,  -- Rechazado
    fecha_ultima_actualizacion = SYSDATETIME()
WHERE id_expediente = @id_expediente;

-- Registrar la justificación de rechazo
INSERT INTO dbo.rechazos_expediente (
    id_expediente,
    id_usuario_coord,
    justificacion
)
VALUES (
           @id_expediente,
           @id_usuario_coordinador,
           @justificacion
       );
END TRY
BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR('Error en sp_RechazarExpediente: %s', 16, 1, @ErrorMessage);
        RETURN;
END CATCH
END;
GO



CREATE OR ALTER PROCEDURE dbo.sp_DeleteExpediente
    @id_expediente INT
    AS
BEGIN
    SET NOCOUNT ON;

BEGIN TRY
BEGIN TRANSACTION;

        -- Eliminar indicios relacionados
DELETE FROM dbo.indicios
WHERE id_expediente = @id_expediente;

-- Eliminar rechazos relacionados (si existen)
IF OBJECT_ID('dbo.rechazos_expediente', 'U') IS NOT NULL
BEGIN
DELETE FROM dbo.rechazos_expediente
WHERE id_expediente = @id_expediente;
END

        -- Eliminar el expediente
DELETE FROM dbo.expedientes
WHERE id_expediente = @id_expediente;

COMMIT TRANSACTION;
END TRY
BEGIN CATCH
IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR('Error en sp_DeleteExpediente: %s', 16, 1, @ErrorMessage);
        RETURN;
END CATCH
END;
GO



CREATE OR ALTER PROCEDURE dbo.sp_ReporteExpedientes
    @fecha_desde   DATE = NULL,
    @fecha_hasta   DATE = NULL,
    @id_estado     INT  = NULL     -- NULL = todos los estados
    AS
BEGIN
    SET NOCOUNT ON;

SELECT
    e.id_expediente,
    e.codigo_expediente,
    e.titulo,
    e.descripcion,
    e.fecha_registro,
    e.fecha_ultima_actualizacion,
    e.fecha_aprobacion,
    e.id_estado_actual,
    est.nombre AS estado_nombre,
    u.nombre_completo AS tecnico_registra
FROM dbo.expedientes e
         INNER JOIN dbo.estados_expediente est
                    ON e.id_estado_actual = est.id_estado
         INNER JOIN dbo.usuarios u
                    ON e.id_tecnico_registra = u.id_usuario
WHERE
    (@fecha_desde IS NULL OR e.fecha_registro >= @fecha_desde)
  AND (@fecha_hasta IS NULL OR e.fecha_registro < DATEADD(DAY, 1, @fecha_hasta))
  AND (@id_estado IS NULL OR e.id_estado_actual = @id_estado)
ORDER BY e.fecha_registro DESC;
END;
GO


CREATE OR ALTER PROCEDURE dbo.sp_ReporteEstadisticasExpedientes
    @fecha_desde DATE = NULL,
    @fecha_hasta DATE = NULL
    AS
BEGIN
    SET NOCOUNT ON;



SELECT
    est.id_estado,
    est.nombre AS estado_nombre,
    COUNT(*) AS total
FROM dbo.expedientes e
         INNER JOIN dbo.estados_expediente est
                    ON e.id_estado_actual = est.id_estado
WHERE
    (@fecha_desde IS NULL OR e.fecha_registro >= @fecha_desde)
  AND (@fecha_hasta IS NULL OR e.fecha_registro < DATEADD(DAY, 1, @fecha_hasta))
GROUP BY
    est.id_estado,
    est.nombre
ORDER BY est.id_estado;
END;
GO
