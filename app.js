const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const DBEngine = require('./Data_Center/dbengine.js');
const MapGuider = require('./neural_network/mapguider.js');
const { raw } = require('express');

const PORT = process.env.PORT || 5000;
const dbengine = new DBEngine();
const guider = new MapGuider([1,2,3,4]);
const corsConfig = {
    origin: "*"
};

let app = express();
app.use(cors(corsConfig));
app.use(express.json());

const setconfig = async function() {
  await dbengine.loadQueries();
  guider.import();
};

let rawdata = fs.readFileSync("train.json");
let trainset = JSON.parse(rawdata);
let normalize = guider.normalize(trainset);

normalize.forEach(element => {
  guider.train(element);
});

 /*********************************************************************
   *                            Usuarios                               *
   **********************************************************************/

app.post('/api/addUsuario',async function(req, res){
  const user = req.body.user;
  const key = req.body.key;

  const verify = await dbengine.script(dbengine.sqlQueries.getPreregistro, key);
  let result = [];

  if(verify.length == 1)
    result = await dbengine.script(dbengine.sqlQueries.addUsuario, user);

  res.send(JSON.stringify((result == undefined) ? [] : result));
});

app.post('/api/updateUsuario',async function(req, res){
  const user = req.body.user;
  const result = await dbengine.script(db.sqlQueries.updateUsuario, user);
  res.send(JSON.stringify(result));
});

app.post('/api/deleteUsuario',async function(req, res){
});

app.post('/api/getUsuario',async function(req, res) {
});

 /*********************************************************************
   *                             Zonas                                 *
   **********************************************************************/

app.post('/api/addZonas',async function(req, res){
});

app.post('/api/updateZonas',async function(req, res){
});

app.post('/api/deleteZonas',async function(req, res){
});

 /*********************************************************************
   *                            Categorias                             *
   **********************************************************************/

app.post('/api/addCategorias',async function(req, res){
});

app.post('/api/updateCategorias',async function(req, res){
});

app.post('/api/deleteCategorias',async function(req, res){
});

 /*********************************************************************
   *                             Eventos                               *
   **********************************************************************/

app.post('/api/addEvento',async function(req, res){
});

app.post('/api/updateEvento',async function(req, res){
});

app.post('/api/deleteEvento',async function(req, res){
});

 /*********************************************************************
   *                             Preregistro                              *
   **********************************************************************/

app.post('/api/addPreregistro',async function(req, res){
});

app.post('/api/deletePreregistro',async function(req, res){
});

app.post('/api/getPreregistro',async function(req, res){
});

 /*********************************************************************
   *                             Recursos                               *
   **********************************************************************/

app.post('/api/addRecurso',async function(req, res){
});

app.post('/api/updateRecurso',async function(req, res){
});

app.post('/api/deleteRecurso',async function(req, res){
});

app.post('/api/getRecurso',async function(req, res){
});

app.post('/api/getAllRecursos',async function(req, res){
  const result = await dbengine.script(dbengine.sqlQueries.getAllRecursos, []);
  res.send(JSON.stringify(result));
});

 /*********************************************************************
   *                             Procesos                              *
   **********************************************************************/

app.post('/api/getLogin',async function(req, res){
  const user = req.body.user;

  const result = await dbengine.script(dbengine.sqlQueries.queryLogin, user);
  res.send(JSON.stringify(result[0]));
});

app.post('/api/getEventos',async function(req, res){
  const result = await dbengine.script(dbengine.sqlQueries.getEventos, []);
  res.send(JSON.stringify(result));
});

app.post('/train', function(req, res) {
  const events = req.body.events;
  // const normalize_array = guider.normalize(events);
  // console.log(events);
  // console.log(normalize_array);

  for(let i = 0; i < events.length; i++)
    guider.train(events[i]);

  res.send(JSON.stringify({ stats: 200 }));
});

app.post('/predict', function(req, res) {
  // const events = req.body.events;
  // const normalize_array = guider.normalize(events);
  normalize.forEach(element => {
    guider.predict(element)
  });

  res.send(JSON.stringify(guider.predict(normalize_array[0])));
});

app.post('/saveconf', function(req, res) {
  guider.export();
  res.send(JSON.stringify({ stats: 200 }));
});

let server = app.listen(PORT, async function () {
  await setconfig();
  console.log(`SeguPrev server running on ${PORT}`);
});
