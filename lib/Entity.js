var Base = require('./Base');
var graph = require('./graph');

var Entity = Base.extend({
  type: "Entity",
  base: "http://entities.open.app",
  constructor: function (db) {
    if (!db) {
      throw new Error("Entity requires a levelup db!");
    }
    this.db = graph.call(this, db);
  },
  methods: {
    get: {
      type: 'async',
      fn: function (id, callback) {
        this.db.jsonld.get(id, callback);
      },
      input: {
        id: {
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
      fn: function (object, callback) {
        this.db.jsonld.put(object, callback);
      },
      input: {
        object: {
          type: 'object',
          required: true,
        },
        options: {
          type: 'object',
        },
      },
    },
    del: {
      type: 'async',
      ffn: function (id, callback) {
        this.db.jsonld.del(id, options, callback);
      },
    },
  }
});

module.exports = Entity;