const express = require('express');
const utils = require( "./Data_Center/utils" );
const cors = require('cors');

let app = express();
const corsConfig = {
    origin: "*"
};
app.use(cors(corsConfig));
app.use(express.json())
let sql = require('mssql');

const config = {
        user: 'sa',
        password: '123456789',
        server: 'MSI',
        database: 'SeguPrev'
    };
 /*********************************************************************
   *                            Usuarios                               *
   **********************************************************************/

app.post('/api/addUsuario',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const user = req.body.user;
        request.input( "Clave", sql.VarChar( 12 ), user.clave );
        request.query(sqlQueries.getPreregistro, function (err, recordset){
            if (err) console.log(err);
            if(recordset.recordset == 1){
                var requestSecond = new sql.Request();
                requesrequestSecondt.input( "email", sql.VarChar( 35 ), user.email );
                requestSecond.input( "Nombre", sql.VarChar( 45 ), user.nombre );
                requestSecond.input( "Pass", sql.VarChar( 18 ), user.pass );
                requestSecond.input( "Telefono", sql.VarChar (10), user.telefono );
                requestSecond.input( "Tipo", sql.Int, user.tipo );
                request.query(sqlQueries.addUsuario, function (err, recordset){
                    if (err) console.log(err);
                    res.send(recordset.recordset);
                });
            }
            else{
                res.send(JSON.stringify({ msg: 'Martin puto' }));
            }
        });
    });
});

app.post('/api/updateUsuario',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const user = req.body.user;
        request.input( "email", sql.VarChar( 35 ), user.email );
        request.input( "Nombre", sql.VarChar( 45 ), user.nombre );
        request.input( "Pass", sql.VarChar( 18 ), user.pass );
        request.input( "Telefono", sql.VarChar (10), user.telefono );
        request.input( "Tipo", sql.VarChar (10), user.tipo );
        request.query(sqlQueries.updateUsuario, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/deleteUsuario',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const user = req.body.user;
        request.input( "email", sql.VarChar( 35 ), user.email );
        request.query(sqlQueries.deleteUsuario, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/getUsuario',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const user = req.body.user;
        request.input( "userId", sql.VarChar( 35 ), user.email );
        request.query(sqlQueries.getEvents, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

 /*********************************************************************
   *                             Zonas                                 *
   **********************************************************************/

app.post('/api/addZonas',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const zone = req.body.zone;
        request.input( "Nombre", sql.VarChar( 35 ), zone.nombre );
        request.input( "Direccion", sql.VarChar( 45 ), zone.direccion );
        request.input( "Latitud", sql.Float, zone.latitud );
        request.input( "Longitud", sql.Float, zone.longitud );
        request.query(sqlQueries.addZonas, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/updateZonas',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const zone = req.body.zone;
        request.input( "Nombre", sql.VarChar( 35 ), zone.nombre );
        request.input( "Direccion", sql.VarChar( 45 ), zone.direccion );
        request.input( "Latitud", sql.Float, zone.latitud );
        request.input( "Longitud", sql.Float, zone.longitud );
        request.query(sqlQueries.updateZonas, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/deleteZonas',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const zone = req.body.zone;
        request.input( "Nombre", sql.VarChar( 35 ), zone.nombre );
        request.query(sqlQueries.deleteUsuario, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

 /*********************************************************************
   *                            Categorias                             *
   **********************************************************************/

app.post('/api/addCategorias',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const categories = req.body.categories;
        request.input( "Nombre", sql.VarChar( 35 ), categories.nombre );
        request.input( "Nivel", sql.Int, categories.nivel );
        request.query(sqlQueries.addCategorias, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/updateCategorias',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const categories = req.body.categories;
        request.input( "Nombre", sql.VarChar( 35 ), categories.nombre );
        request.input( "Nivel", sql.Int, categories.nivel );
        request.query(sqlQueries.updateCategorias, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/deleteCategorias',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const categories = req.body.categories;
        request.input( "Nombre", sql.VarChar( 35 ), categories.nombre );
        request.query(sqlQueries.deleteCategorias, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

 /*********************************************************************
   *                             Eventos                               *
   **********************************************************************/

app.post('/api/addEvento',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const event = req.body.event;
        request.input( "Id", sql.VarChar( 12 ), event.id );
        request.input( "Zona", sql.VarChar( 35 ), event.zona );
        request.input( "Tipo", sql.VarChar( 35 ), event.tipo );
        request.input( "Hora", sql.DateTime, event.hora );
        request.query(sqlQueries.addEvento, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/updateEvento',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const event = req.body.event;
        request.input( "Id", sql.VarChar( 12 ), event.id );
        request.input( "Zona", sql.VarChar( 35 ), event.zona );
        request.input( "Tipo", sql.VarChar( 35 ), event.tipo );
        request.input( "Hora", sql.DateTime, event.hora );
        request.query(sqlQueries.updateEventos, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/deleteEvento',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const event = req.body.event;
        request.input( "Id", sql.VarChar( 12 ), event.id );
        request.query(sqlQueries.deleteEventos, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

 /*********************************************************************
   *                             Preregistro                              *
   **********************************************************************/

app.post('/api/addPreregistro',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const pre = req.body.pre;
        request.input( "Clave", sql.VarChar( 35 ), pre.clave );
        request.query(sqlQueries.addPreregistro, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/deletePreregistro',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const pre = req.body.pre;
        request.input( "Clave", sql.VarChar( 35 ), pre.clave );
        request.query(sqlQueries.deletePreregistro, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

app.post('/api/getPreregistro',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const pre = req.body.pre;
        request.input( "Clave", sql.VarChar( 35 ), pre.clave );
        request.query(sqlQueries.getPreregistro, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

 /*********************************************************************
   *                             Procesos                              *
   **********************************************************************/

app.post('/api/getLogin',async function(req, res){
    const sqlQueries = await utils.loadSqlQueries( "Data_Center/events" );
    sql.connect(config,function(err){
        if(err) console.error(err);
        var request = new sql.Request();
        const user = req.body.user;
        request.input( "userId", sql.VarChar( 35 ), user.email );
        request.input( "pass", sql.VarChar( 35 ), user.pass );
        request.query(sqlQueries.queryLogin, function (err, recordset){
            if (err) console.log(err);
            res.send(recordset.recordset);
        });
    });
});

let server = app.listen(5000, function () {
    console.log('Server is running..');
});