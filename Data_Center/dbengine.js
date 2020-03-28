const sql = require('mssql');
const utils  = require( "./utils.js" );

class DBEngine {
  constructor() {
    this.sqlQueries = null;
    this.authenticator_sqlserver = {
        user: 'SA',
        password: '@Renn(E=mcc)',
        server: 'localhost',
        database: 'SeguPrev'
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
