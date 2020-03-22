INSERT INTO [dbo].[Usuarios] (
[email]
, [Nombre]
, [Pass]
, [Telefono]
, [Tipo]
)
VALUES (
    @email
    , @Nombre
    , @Pass
    , @Telefono
    , @Tipo
);