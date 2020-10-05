SELECT [email]
    , [name]
    , [password]
    , [tel]
    , [type]
FROM [dbo].[Users]
WHERE [email] = @email