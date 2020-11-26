const express = require("express");
const DBEngine = require("../datacenter/dbengine");

let router = express.Router();

router
  .get("/", async (req, res) => {})
  .get("/all", async (req, res) => {
    const result = await DBEngine.script(DBEngine.sqlQueries.getAllZones, []);
    res.send(JSON.stringify(result));
  })
  .post("/", async (req, res) => {
    const zone = req.body.data;
    const result = await DBEngine.script(DBEngine.sqlQueries.addZones, zone);
    res.send(JSON.stringify(result));
  })
  .put("/", async (req, res) => {})
  .delete("/", async (req, res) => {
    const event = req.body.data;
    const result = await DBEngine.script(DBEngine.sqlQueries.deleteZoneData, event);
    let deleteData = [];
    if(result != null) {
      deleteData = await DBEngine.script(DBEngine.sqlQueries.deleteZone, event);
    }
    console.log(deleteData);
    res.send(JSON.stringify(deleteData));
  });

module.exports = router;
