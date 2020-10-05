const sql = require('mssql');
const utils  = require( "./utils.js" );

const authenticator_sqlserver = {
  user: "sa",
  password: "pelemarley23",
  server: "LAPTOP-KB07PLPC",
  database: "SeguPrev",
  options: {
    trustedConnection: true,
  },
};

class DBEngine {
  constructor() { }

  static async loadQueries() {
    this.sqlQueries = await utils.loadSqlQueries( "./datacenter/events" );
  }

  static async script(query, params) {
    await sql.connect(authenticator_sqlserver);
    const request = await new sql.Request();

    params.forEach(function(element) {
      request.input(element.name, element.value);
    });

    const result = await request.query(query);
    return result.recordset;
  }

}

module.exports = DBEngine;
