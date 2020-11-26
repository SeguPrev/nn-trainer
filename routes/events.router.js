const express = require("express");

const Crypto = require("../datacenter/crypto");
const DBEngine = require("../datacenter/dbengine");
const MapGuider = require("../neural_network/mapguider");

let router = express.Router();
let guider = new MapGuider();

router
  .get("/", async (req, res) => {
    res.send(JSON.stringify([]));
  })
  .get("/records", async (req, res) => {
    const event = JSON.parse(req.query.event);
    console.log(event);
    const result = await DBEngine.script(
      DBEngine.sqlQueries.getAllEvents,
      event
    );
    res.send(JSON.stringify(result));
  })
  .get("/all", async (req, res) => {
    const inDayDate = req.query.day;
    const inMonthDate = req.query.month;
    const inYearDate = req.query.year;

    const today = new Date(inYearDate, inMonthDate, inDayDate);
    const dateInit = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 3));
    const dateFinish = new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 3));

    let primaryCases = [];
    let result = [];
    
    for(let i = 0; i < 8; i++) {
      result = result.concat(await DBEngine.script(
        DBEngine.sqlQueries.getEvents,
        [
          { name: "dateInit", value: dateInit},
          { name: "dateFinish", value: dateFinish }
        ]
      ));
      dateInit.setFullYear(dateInit.getFullYear() - 1);
      dateFinish.setFullYear(dateFinish.getFullYear() - 1);
    }

    if(result != null) {
      let data = MapGuider.parse(result);
      for(const key in data) {
        if(guider.predict(data[key].cases) >= .5) {
          data[key].zone = key;
          primaryCases.push(data[key]);
        }
      }
    }

    res.send(JSON.stringify(primaryCases));
  })
  .get("/all/np", async (req, res) => {
    const inDayDate = req.query.day;
    const inMonthDate = req.query.month;
    const inYearDate = req.query.year;

    const today = new Date(inYearDate, inMonthDate, inDayDate);
    const dateInit = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 3));
    const dateFinish = new Date(today.getFullYear(), today.getMonth(), (today.getDate() + 3));

    let primaryCases = [];
    let result = [];

    for(let i = 0; i < 8; i++) {
      result = result.concat(await DBEngine.script(
        DBEngine.sqlQueries.getEvents,
        [
          { name: "dateInit", value: dateInit},
          { name: "dateFinish", value: dateFinish }
        ]
      ));
      dateInit.setFullYear(dateInit.getFullYear() - 1);
      dateFinish.setFullYear(dateFinish.getFullYear() - 1);
    }

    if(result != null) {
      let data = MapGuider.parse(result);
      for(const key in data) {
          data[key].zone = key;
          primaryCases.push(data[key]);
      }
    }

    res.send(JSON.stringify(primaryCases));
  })
  .post("/", async (req, res) => {
    const event = req.body.data.event;
    event.push({ name: "id", value: Crypto.genId(12) });
    const result = await DBEngine.script(
      DBEngine.sqlQueries.addEvents,
      event
    );
    res.send(JSON.stringify(result));
  })
  .put("/", async (req, res) => {
    const event = req.body.data;
    const result = await DBEngine.script(
      DBEngine.sqlQueries.updateEvents,
      event
    );
    res.send(result);
  })
  .delete("/", async (req, res) => {
    const id = req.body.data;
    const result = await DBEngine.script(
      DBEngine.sqlQueries.deleteEvents,
      id
    );
    res.send(JSON.stringify(result));
  });

module.exports = router;