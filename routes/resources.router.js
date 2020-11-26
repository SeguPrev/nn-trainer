const express = require("express");
const Crypto = require("../datacenter/crypto");
const DBEngine = require("../datacenter/dbengine");

let router = express.Router();

router
  .get("/", async (req, res) => {
    res.send(JSON.stringify([]));
  })
  .get("/all", async (req, res) => {
      const result = await DBEngine.script(
        DBEngine.sqlQueries.getAllResources,
        []
      );
      res.send(JSON.stringify(result));
  })
  .post("/", async (req, res) => {
    let resource = req.body.data;
    resource.push({ name: 'id', value: Crypto.genId(9) });
    const result = await DBEngine.script(
      DBEngine.sqlQueries.addResource,
      resource
    );
    res.send(result);
  })
  .put("/", async (req, res) => {})
  .delete("/", async (req, res) => {
    const resource = req.body.data;
    const result = await DBEngine.script(
      DBEngine.sqlQueries.deleteResource,
      resource
    );
    res.send(JSON.stringify(result));
  });

module.exports = router;