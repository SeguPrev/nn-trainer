SELECT *
FROM [dbo].[Events] INNER JOIN [dbo].[Zones]
ON [dbo].[Zones].[name] = [dbo].[Events].[zone]
where [dbo].[Events].[time] BETWEEN @dateInit AND @dateFinish