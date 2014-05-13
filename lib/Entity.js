var Base = require('./Base');

var Entity = Base.extend({
  type: "Entity",
  constructor: function (db) {
    if (!db) {
      throw new Error("Entity requires a levelup db!");
    }
    this.db = db;
  },
  methods: {
    get: {
      type: 'async',
      fn: function () {
        return this.db.get.apply(this, arguments);
      },
      input: {
        key: {
          type: 'string',
          required: true,
        },
        options: {
          type: 'object',
        },
      },
    },
    put: {
      type: 'async',
      fn: function () {
        return this.db.put.apply(this, arguments);
      },
      input: {
        key: {
          type: 'string',
          required: true,
        },
        value: {
          type: 'any',
          required: true,
        },
        options: {
          type: 'object',
        },
      },
    },
    del: {
      type: 'async',
      fn: function () {
        return this.db.del.apply(this, arguments);
      },
    },
  }
});

module.exports = Entity;