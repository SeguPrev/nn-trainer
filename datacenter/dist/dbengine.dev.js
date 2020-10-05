"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sql = require('mssql');

var utils = require("./utils.js.js");

var DBEngine =
/*#__PURE__*/
function () {
  function DBEngine() {
    _classCallCheck(this, DBEngine);

    this.sqlQueries = null;
    this.authenticator_sqlserver = {
      user: 'sa',
      password: 'pelemarley23',
      server: 'LAPTOP-KB07PLPC',
      database: 'SeguPrev',
      options: {
        trustedConnection: true
      }
    };
  }

  _createClass(DBEngine, [{
    key: "loadQueries",
    value: function loadQueries() {
      return regeneratorRuntime.async(function loadQueries$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(utils.loadSqlQueries("./Data_Center/events"));

            case 2:
              this.sqlQueries = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "script",
    value: function script(query, params) {
      var request, result;
      return regeneratorRuntime.async(function script$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(sql.connect(this.authenticator_sqlserver));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(new sql.Request());

            case 4:
              request = _context2.sent;
              params.forEach(function (element) {
                request.input(element.name, element.value);
              });
              _context2.next = 8;
              return regeneratorRuntime.awrap(request.query(query));

            case 8:
              result = _context2.sent;
              return _context2.abrupt("return", result.recordset);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /*getType(type) {
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
    }*/

  }]);

  return DBEngine;
}();

module.exports = DBEngine;