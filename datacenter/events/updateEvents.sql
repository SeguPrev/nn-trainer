UPDATE [dbo].[Events] 
SET 
[name] = @name
, [type] = @type
, [time] = @time
WHERE [name] = @name