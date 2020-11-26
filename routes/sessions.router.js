const express = require("express");
const Crypto = require("../datacenter/crypto");
const DBEngine = require("../datacenter/dbengine");

let router = express.Router();

router
  .post("/key", async (req, res) => {
    const key = Crypto.genId(12);
    await DBEngine.script(
      DBEngine.sqlQueries.addPreregister,
      [{ name: "key", value: key }]
    );

    res.send(JSON.stringify(key));
  })
  .post("/login", async (req, res) => {
      const user = req.body.data;

      const result = await DBEngine.script(
        DBEngine.sqlQueries.queryLogin,
        user
      );
      res.send(JSON.stringify(result));
  });

module.exports = router;