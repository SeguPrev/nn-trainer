UPDATE [dbo].[Usuarios] 
SET 
[Nombre] = @Nombre
, [Pass] = @Pass
, [Telefono] = @Telefono
, [Tipo] = @Tipo
WHERE [email] = @email
