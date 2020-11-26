const express = require("express");
const DBEngine = require("../datacenter/dbengine");

let router = express.Router();

router
  .get("/all", async (req, res) => {
    const users = await DBEngine.script(
      DBEngine.sqlQueries.getAllUsers,
      []
    );
    res.send(JSON.stringify(users));
  })
  .get("/employee", async (req, res) => {
    const employees = await DBEngine.script(
      DBEngine.sqlQueries.getAllEmployees,
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

    res.send(JSON.stringify(verify.length == 0 ? ['not ok'] : result));
  })
  .put("/", async (req, res) => {
    const user = req.body.data;
    await DBEngine.script(DBEngine.sqlQueries.updateUser, user);
    res.send(JSON.stringify([]));
  })
  .delete("/", async (req, res) => {
    const user = req.body.data;
    const result = await DBEngine.script(DBEngine.sqlQueries.deleteUser, user);
    res.send(result);
  });

module.exports = router;