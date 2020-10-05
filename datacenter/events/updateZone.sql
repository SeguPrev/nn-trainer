UPDATE [dbo].[Zones] 
SET 
[name] = @Nombre
, [address] = @Direccion
, [latitude] = @Latitud
, [longitude] = @Longitud
WHERE [name] = @name