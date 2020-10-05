const express = require("express");
const DBEngine = require("../datacenter/dbengine");
const MapGuider = require("../neural_network/mapguider.js");

let router = express.Router();
const guider = new MapGuider([1, 2, 3, 4]);

router
  .post("/train", async (req, res) => {
      const events = req.body.data;
      // const normalize_array = guider.normalize(events);
      // console.log(events);
      // console.log(normalize_array);

      for (let i = 0; i < events.length; i++) guider.train(events[i]);

      res.send(JSON.stringify([]));
  })
  .post("/predict", async (req, res) => {
      const events = req.body.data;
      const normalize_array = guider.normalize(events);
      normalize_array.forEach((element) => {
        guider.predict(element);
      });

      res.send(JSON.stringify(guider.predict(normalize_array[0])));
  })
  .post("/save", async (req, res) => {
       guider.export();
       res.send(JSON.stringify([]));
  });

module.exports = router;