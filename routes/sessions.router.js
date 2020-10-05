const express = require("express");
const DBEngine = require("../datacenter/dbengine");

let router = express.Router();

router
  .post("/login", async (req, res) => {
      const user = req.body.data;

      const result = await DBEngine.script(
        DBEngine.sqlQueries.queryLogin,
        user
      );
      res.send(JSON.stringify(result[0]));
  });

module.exports = router;