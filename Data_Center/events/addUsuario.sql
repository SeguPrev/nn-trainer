INSERT INTO [dbo].[Usuarios] (
[email]
, [Nombre]
, [Pass]
, [Telefono]
, [Tipo]
)
VALUES (
    @email
    , @name
    , @pass
    , @tel
    , @type
);
