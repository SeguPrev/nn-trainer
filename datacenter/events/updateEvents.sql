UPDATE [dbo].[Events] 
SET 
[zone] = @zone
, [type] = @type
, [time] = @time
WHERE [id] = @id