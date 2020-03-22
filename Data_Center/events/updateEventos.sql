UPDATE [dbo].[Eventos] 
SET 
[Zona] = @Zona
, [Tipo] = @Tipo
, [Hora] = @Hora
WHERE [Id] = @Id