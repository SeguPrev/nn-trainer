const express = require('express');
const cors = require('cors');
const fs = require('fs');

const DBEngine = require("./datacenter/dbengine");
const Crypto = require("./datacenter/crypto");

const nn = require("./routes/nn.router");
const users = require('./routes/users.router');
const zones = require("./routes/zones.router");
const events = require("./routes/events.router");
const sessions = require("./routes/sessions.router");
const resources = require("./routes/resources.router");
const categories = require("./routes/categories.router");

const PORT = process.env.PORT || 5000;

const corsConfig = {
    origin: "*"
};

let app = express();
app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/nn", nn);
app.use('/api/user', users);
app.use("/api/zone", zones);
app.use("/api/event", events);
app.use("/api/session", sessions);
app.use("/api/resource", resources);
app.use("/api/category", categories);

const setconfig = async function() {
  await DBEngine.loadQueries();
};

app.post('/api/getEventos',async function(req, res){
  const result = await DBEngine.script(DBEngine.sqlQueries.getEvents, []);
  res.send(JSON.stringify(result));
});

app.get('/api/backup', async function(req, res) {
  const events = await DBEngine.script(DBEngine.sqlQueries.getListEvent, []);
  const zones = await DBEngine.script(DBEngine.sqlQueries.getAllZones, []);
  const resources = await DBEngine.script(DBEngine.sqlQueries.getAllResources, []);
  const categories = await DBEngine.script(DBEngine.sqlQueries.getAllCategories, []);
  const users = await DBEngine.script(DBEngine.sqlQueries.getAllUsers, []);
  let brain = [];
  if (fs.existsSync('brain.json')) {
    brain = fs.readFileSync('brain.json', 'utf-8');
    if(typeof(brain) === 'string') {
      brain = JSON.parse(brain);
    }
  }

  res.send(JSON.stringify({
    events: events,
    zones: zones,
    resources: resources,
    categories: categories,
    users: users,
    brain: brain
  }));
});

app.post('/api/backup', async function(req, res) {
  const data = req.body;
  const events = Crypto.zip(data.events);
  const zones = Crypto.zip(data.zones);
  const resources = Crypto.zip(data.resources);
  const categories = Crypto.zip(data.categories);
  const users = Crypto.zip(data.users);
  const brain = data.brain;

  await categories.forEach(async category => {
    const result = await DBEngine.script(DBEngine.sqlQueries.getCategory, category);
    if(result.length == 0) {
      await DBEngine.script(DBEngine.sqlQueries.addCategory, category);
    }
  });

  await zones.forEach(async zone => {
    console.log(zone);
    const result = await DBEngine.script(DBEngine.sqlQueries.getZone, zone);
    if(result.length == 0) {
      await DBEngine.script(DBEngine.sqlQueries.addZones, zone);
    }
  });

  await events.forEach(async event => {
    const result = await DBEngine.script(DBEngine.sqlQueries.getEvent, event);
    if(result.length == 0) {
      await DBEngine.script(DBEngine.sqlQueries.addEvents, event);
    }
  });

  await resources.forEach(async resource => {
    const result = await DBEngine.script(DBEngine.sqlQueries.getResource, resource);
    if(result.length == 0) {
      await DBEngine.script(DBEngine.sqlQueries.addResource, resource);
    }
  });

  await users.forEach(async user => {
    const result = await DBEngine.script(DBEngine.sqlQueries.getUser, user);
    if(result.length == 0) {
      await DBEngine.script(DBEngine.sqlQueries.addUsers, user);
    }
  });
});


let server = app.listen(PORT, async function () {
  await setconfig();
  console.log(`SeguPrev server running on ${PORT}`);
});
