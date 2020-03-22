SELECT [email]
    , [Nombre]
    , [Pass]
    , [Telefono]
    , [Zona]
FROM [dbo].[Usuarios]
WHERE [email] = @userId