const express = require("express");
const DBEngine = require("../datacenter/dbengine");
const MapGuider = require("../neural_network/mapguider.js");

let router = express.Router();
const guider = new MapGuider([1, 2, 3, 4]);
guider.import();

router
  .post("/train", async (req, res) => {
      const events = req.body.data;
      for (let i = 0; i < events.length; i++) guider.train(events[i]);
      res.send(JSON.stringify([]));
  })
  .post("/predict", async (req, res) => {
      const events = req.body.data;
      res.send(JSON.stringify(guider.predict(events[0])));
  })
  .post("/save", async (req, res) => {
       guider.export();
       res.send(JSON.stringify([]));
  });

module.exports = router;