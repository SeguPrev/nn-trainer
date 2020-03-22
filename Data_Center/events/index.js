"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "events" );

   const getEvents = async email => {
       // get a connection to SQL Server
       const cnx = await getConnection();

       // create a new request
       const request = await cnx.request();

       // configure sql query parameters
       request.input( "email", sql.VarChar( 35 ), email );

       // return the executed query
       return request.query( sqlQueries.getEvents );
   };

   //Comandos para la A,B,C de Usuarios

   const addEvent = async ( { email, nombre, pass, telefono, tipo} ) => {
       const pool = await getConnection();
       const request = await pool.request();
       request.input( "email", sql.VarChar( 35 ), email );
       request.input( "Nombre", sql.VarChar( 45 ), nombre );
       request.input( "Pass", sql.VarChar( 18 ), pass );
       request.input( "Telefono", sql.VarChar (10), telefono );
       request.input( "Tipo", sql.Int, tipo );
       return request.query( sqlQueries.addEvent );
   };

   const updateEvent = async ( { email, nombre, pass, telefono, tipo} ) => {
       const pool = await getConnection();
       const request = await pool.request();
       request.input( "email", sql.VarChar( 35 ), email );
       request.input( "Nombre", sql.VarChar( 45 ), nombre );
       request.input( "Pass", sql.VarChar( 18 ), pass );
       request.input( "Telefono", sql.VarChar (10), telefono );
       request.input( "Tipo", sql.Int, tipo );
       return request.query( sqlQueries.updateEvent );
   };

   const deleteEvent = async ( { email} ) => {
       const pool = await getConnection();
       const request = await pool.request();
       request.input( "email", sql.VarChar( 35 ), email );
       return request.query( sqlQueries.deleteEvent );
   };

   //Comandos para la A,B,C de Zonas

   const addZonas = async ( { nombre, direccion, latitud, longitud} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Nombre", sql.VarChar( 35 ), nombre );
        request.input( "Direccion", sql.VarChar( 45 ), direccion );
        request.input( "Latitud", sql.Float, latitud );
        request.input( "Longitud", sql.Float, longitud );
        return request.query( sqlQueries.addZonas );
    };

    const updateZonas = async ( { nombre, direccion, latitud, longitud} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Nombre", sql.VarChar( 35 ), nombre );
        request.input( "Direccion", sql.VarChar( 45 ), direccion );
        request.input( "Latitud", sql.Float, latitud );
        request.input( "Longitud", sql.Float, longitud );
        return request.query( sqlQueries.updateZonas );
    };

    const deleteZonas = async ( { nombre} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Nombre", sql.VarChar( 35 ), nombre );
        return request.query( sqlQueries.deleteZonas );
    };

    //Comandos para la A,B,C de Eventos

   const addEventos = async ( { id, zona, tipo, hora} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Id", sql.VarChar( 12 ), id );
        request.input( "Zona", sql.VarChar( 35 ), zona );
        request.input( "Tipo", sql.VarChar( 35 ), tipo );
        request.input( "Hora", sql.DateTime, hora );
        return request.query( sqlQueries.addEventos );
    };

    const updateEventos = async ( {id, zona, tipo, hora} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Id", sql.VarChar( 12 ), id );
        request.input( "Zona", sql.VarChar( 35 ), zona );
        request.input( "Tipo", sql.VarChar( 35 ), tipo );
        request.input( "Hora", sql.DateTime, hora );
        return request.query( sqlQueries.updateEventos );
    };

    const deleteEventos = async ( { id} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Id", sql.VarChar( 12 ), id );
        return request.query( sqlQueries.deleteEventos );
    };

    //Comandos para la A,B,C de Categorias

   const addCategorias = async ( { nombre, nivel} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Nombre", sql.VarChar( 35 ), nombre );
        request.input( "Nivel", sql.Int, nivel );
        return request.query( sqlQueries.addCategorias );
    };

    const updateCategorias = async ( { nombre, nivel} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Nombre", sql.VarChar( 35 ), nombre );
        request.input( "Nivel", sql.Int, nivel );
        return request.query( sqlQueries.updateCategorias );
    };

    const deleteCategorias = async ( { nombre} ) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input( "Id", sql.VarChar( 35 ), nombre );
        return request.query( sqlQueries.deleteCategorias );
    };

   return {
       addEvent,
       deleteEvent,
       getEvents,
       updateEvent,

       addZonas,
       deleteZonas,
       updateZonas,

       addEventos,
       deleteEventos,
       updateEventos,

       addCategorias,
       deleteCategorias,
       updateCategorias
   };
};

module.exports = { register };