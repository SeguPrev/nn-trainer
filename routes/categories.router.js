const express = require("express");
const DBEngine = require("../datacenter/dbengine");

let router = express.Router();

router
  .get("/", async (req, res) => {})
  .get("/all", async (req, res) => {
    const result = await DBEngine.script(DBEngine.sqlQueries.getAllCategories, []);
    res.send(JSON.stringify(result));
  })
  .post("/", async (req, res) => {})
  .put("/", async (req, res) => {})
  .delete("/", async (req, res) => {});

module.exports = router;