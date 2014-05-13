var Base = require('./Base');

var Entity = Base.extend({
  constructor: function (db) {
    if (!db) {
      throw new Error("Entity requires a levelup db!");
    }
    this.db = db;
  },
  get: function () {
    return this.db.get.apply(this, arguments);
  },
  put: function () {
    return this.db.put.apply(this, arguments);
  },
  del: function () {
    return this.db.del.apply(this, arguments);
  },
});

module.exports = Entity;