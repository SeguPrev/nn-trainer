const sql = require('mssql');
const utils  = require( "./utils.js" );

class DBEngine {
  constructor() {
    this.sqlQueries = null;
    this.authenticator_sqlserver = {
        user: 'sa',
        password: 'pelemarley23',
        server: 'LAPTOP-KB07PLPC',
        database: 'SeguPrev',
        options: {
          trustedConnection: true,
        },
    };
  }

  async loadQueries() {
    this.sqlQueries = await utils.loadSqlQueries( "./Data_Center/events" );
  }

  async script(query, params) {
    await sql.connect(this.authenticator_sqlserver);
    const request = await new sql.Request();
    const self = this;

    params.forEach(function(element, index) {
      let type = self.getType(element.type);
      request.input(element.name, type, element.value);
    });

    const result = await request.query(query);
    return result.recordset;
  }

  getType(type) {
    if(type > 0)
      return sql.VarChar(type);

    switch(type) {
      case -1:
        return sql.Int;
      case -2:
        return sql.Float;
      case -3:
        return sql.DateTime;
    }
  }


}

module.exports = DBEngine;
