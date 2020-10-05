const express = require('express');
const cors = require('cors');
const fs = require('fs');

const DBEngine = require("./datacenter/dbengine");

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


let server = app.listen(PORT, async function () {
  await setconfig();
  console.log(`SeguPrev server running on ${PORT}`);
});
