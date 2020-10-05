UPDATE [dbo].[Users] 
SET 
[name] = @name
, [password] = @password
, [tel] = @tel
, [type] = @type
WHERE [email] = @email
