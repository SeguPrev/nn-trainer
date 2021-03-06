USE [master]
GO
/****** Object:  Database [SeguPrev]    Script Date: 22/03/2020 07:39:33 p. m. ******/
CREATE DATABASE [SeguPrev]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SeguPrev', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SeguPrev.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SeguPrev_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\SeguPrev_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SeguPrev] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SeguPrev].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SeguPrev] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SeguPrev] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SeguPrev] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SeguPrev] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SeguPrev] SET ARITHABORT OFF 
GO
ALTER DATABASE [SeguPrev] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SeguPrev] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SeguPrev] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SeguPrev] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SeguPrev] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SeguPrev] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SeguPrev] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SeguPrev] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SeguPrev] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SeguPrev] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SeguPrev] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SeguPrev] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SeguPrev] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SeguPrev] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SeguPrev] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SeguPrev] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SeguPrev] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SeguPrev] SET RECOVERY FULL 
GO
ALTER DATABASE [SeguPrev] SET  MULTI_USER 
GO
ALTER DATABASE [SeguPrev] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SeguPrev] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SeguPrev] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SeguPrev] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SeguPrev] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'SeguPrev', N'ON'
GO
ALTER DATABASE [SeguPrev] SET QUERY_STORE = OFF
GO
USE [SeguPrev]
GO
/****** Object:  Table [dbo].[Categorias]    Script Date: 22/03/2020 07:39:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorias](
	[Nombre] [varchar](35) NOT NULL,
	[Nivel] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Eventos]    Script Date: 22/03/2020 07:39:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Eventos](
	[Id] [varchar](12) NOT NULL,
	[Zona] [varchar](35) NULL,
	[Tipo] [varchar](35) NULL,
	[Hora] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Preregistro]    Script Date: 22/03/2020 07:39:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Preregistro](
	[Clave] [varchar](12) NOT NULL,
 CONSTRAINT [PK_Preregistro] PRIMARY KEY CLUSTERED 
(
	[Clave] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Recursos]    Script Date: 22/03/2020 07:39:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recursos](
	[Serie] [varchar](9) NOT NULL,
	[Latitud] [float] NULL,
	[Longitud] [float] NULL,
 CONSTRAINT [PK_Recursos] PRIMARY KEY CLUSTERED 
(
	[Serie] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 22/03/2020 07:39:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[email] [varchar](35) NOT NULL,
	[Nombre] [varchar](45) NULL,
	[Pass] [varchar](18) NULL,
	[Telefono] [varchar](10) NULL,
	[Tipo] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Zonas]    Script Date: 22/03/2020 07:39:34 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Zonas](
	[Nombre] [varchar](35) NOT NULL,
	[Direccion] [varchar](45) NULL,
	[Latitud] [float] NULL,
	[Longitud] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[Nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Categorias] ([Nombre], [Nivel]) VALUES (N'Asesinato', 2)
INSERT [dbo].[Categorias] ([Nombre], [Nivel]) VALUES (N'Robo ', 3)
INSERT [dbo].[Categorias] ([Nombre], [Nivel]) VALUES (N'Tomar en Banqueta', 1)
INSERT [dbo].[Eventos] ([Id], [Zona], [Tipo], [Hora]) VALUES (N'A1', N'Centro', N'Asesinato', CAST(N'2008-11-11T00:00:00.000' AS DateTime))
INSERT [dbo].[Eventos] ([Id], [Zona], [Tipo], [Hora]) VALUES (N'A2', N'Mexico', N'Tomar en Banqueta', CAST(N'2020-03-21T00:00:00.000' AS DateTime))
INSERT [dbo].[Preregistro] ([Clave]) VALUES (N'A00000000001')
INSERT [dbo].[Preregistro] ([Clave]) VALUES (N'A00000000002')
INSERT [dbo].[Recursos] ([Serie], [Latitud], [Longitud]) VALUES (N'1022HCTY9', 27.488902, -109.976019)
INSERT [dbo].[Recursos] ([Serie], [Latitud], [Longitud]) VALUES (N'981340ABC', 27.45966, -109.926752)
INSERT [dbo].[Usuarios] ([email], [Nombre], [Pass], [Telefono], [Tipo]) VALUES (N'alberto-032@hotmail.es', N'Rene', N'123456', N'123456', NULL)
INSERT [dbo].[Usuarios] ([email], [Nombre], [Pass], [Telefono], [Tipo]) VALUES (N'alberto-032@live.com', N'Martin', N'123456', N'4163980', NULL)
INSERT [dbo].[Usuarios] ([email], [Nombre], [Pass], [Telefono], [Tipo]) VALUES (N'dayanne_gaby@hotmail.com', N'Dayanne', N'seguprev2020', N'6443567832', 1)
INSERT [dbo].[Usuarios] ([email], [Nombre], [Pass], [Telefono], [Tipo]) VALUES (N'rennyjr@gmail.com', N'Rene', N'seguprev2020', N'6442589971', 1)
INSERT [dbo].[Usuarios] ([email], [Nombre], [Pass], [Telefono], [Tipo]) VALUES (N'rennyjr98@gmail.com', N'Rene', N'seguprev2020', N'6442589971', 1)
INSERT [dbo].[Zonas] ([Nombre], [Direccion], [Latitud], [Longitud]) VALUES (N'Centro', N'No Reeleccion', 27.491999, -109.935926)
INSERT [dbo].[Zonas] ([Nombre], [Direccion], [Latitud], [Longitud]) VALUES (N'Mexico', N'Colonia Mexico', 27.464097, -109.941364)
ALTER TABLE [dbo].[Eventos]  WITH CHECK ADD FOREIGN KEY([Tipo])
REFERENCES [dbo].[Categorias] ([Nombre])
GO
USE [master]
GO
ALTER DATABASE [SeguPrev] SET  READ_WRITE 
GO
