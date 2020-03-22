UPDATE [dbo].[Zonas] 
SET 
[Nombre] = @Nombre
, [Direccion] = @Direccion
, [Latitud] = @Latitud
, [Longitud] = @Longitud
WHERE [Nombre] = @Nombre