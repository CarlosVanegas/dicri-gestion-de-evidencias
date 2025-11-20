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
