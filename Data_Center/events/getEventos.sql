SELECT *
FROM [dbo].[Eventos] INNER JOIN [dbo].[Zonas]
ON [dbo].[Zonas].[Nombre] = [dbo].[Eventos].[Zona]
