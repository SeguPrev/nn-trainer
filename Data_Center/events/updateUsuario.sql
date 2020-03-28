UPDATE [dbo].[Usuarios] 
SET 
[Nombre] = @name
, [Pass] = @pass
, [Telefono] = @tel
, [Tipo] = @type
WHERE [email] = @email
