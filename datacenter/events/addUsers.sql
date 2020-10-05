INSERT INTO [dbo].[Users] (
[email]
, [name]
, [password]
, [tel]
, [type]
)
VALUES (
    @email
    , @name
    , @password
    , @tel
    , @type
);
