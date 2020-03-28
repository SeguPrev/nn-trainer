const sql = require('mssql');

class Parser {
  constructor() { }

  parseUser(user) {
    return [
      user.email,
      user.name,
      user.pass,
      user.tel,
      user.type
    ];
  }

  renderLogin() {
    return [
      {name: 'email', type: sql.VarChar(35)},
      {name: 'pass', type: sql.VarChar(18)},
    ];
  }

  renderUser() {
    return [
      {name: 'email', type: sql.VarChar(35)},
      {name: 'name', type: sql.VarChar(45)},
      {name: 'pass', type: sql.VarChar(18)},
      {name: 'tel', type: sql.VarChar(10)},
      {name: 'type', type: sql.Int},
    ];
  }

  renderZone() {
    const sql = this.SQL;
    return [
      {name: 'name', type: sql.VarChar(35)},
      {name: 'address', type: sql.VarChar(45)},
      {name: 'lat', type: sql.Float},
      {name: 'lng', type: sql.Float},
    ];
  }

  renderCategory() {
    const sql = this.SQL;
    return [
      {name: 'name', type: sql.VarChar(35)},
      {name: 'level', type: sql.Int},
    ];
  }

  renderEvent() {
    const sql = this.SQL;
    return [
      {name: 'id', type: sql.VarChar(12)},
      {name: 'zone', type: sql.VarChar(35)},
      {name: 'type', type: sql.VarChar(35)},
      {name: 'time', type: sql.DateTime},
    ];
  }

  renderPreReg() {
    const sql = this.SQL;
    return [
      {name: 'key', type: sql.VarChar(12)},
    ];
  }

  renderResources() {
    const sql = this.SQL;
    return [
      {name: 'serie', type: sql.VarChar(12)},
      {name: 'lat', type: sql.Float},
      {name: 'lng', type: sql.Float},
    ];
  }
}

module.exports = Parser;
