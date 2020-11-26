SELECT *
FROM [dbo].[Events] INNER JOIN [dbo].[Zones]
ON [dbo].[Zones].[name] = [dbo].[Events].[zone]
where [dbo].[Zones].[latitude] = @lat AND [dbo].[Zones].[longitude] = @lng