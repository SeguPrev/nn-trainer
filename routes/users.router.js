const express = require("express");
const DBEngine = require("../datacenter/dbengine");

let router = express.Router();

router
  .get("/", async (req, res) => {})
  .get("/employee", async (req, res) => {
    const employees = await dbengine.script(
      dbengine.sqlQueries.getAllEmployees,
      []
    );
    res.send(employees);
  })
  .post("/", async (req, res) => {
    const user = req.body.data.user;
    const key = req.body.data.key;

    const verify = await DBEngine.script(
      DBEngine.sqlQueries.getPreregister,
      key
    );
    let result = [];

    if (verify.length == 1)
      result = await DBEngine.script(DBEngine.sqlQueries.addUsers, user);

    res.send(JSON.stringify(result == undefined ? [] : result));
  })
  .put("/", async (req, res) => {
    const user = req.body.data;
    await DBEngine.script(DBEngine.sqlQueries.updateUser, user);
    res.send(JSON.stringify([]));
  })
  .delete("/", async (req, res) => {});

module.exports = router;