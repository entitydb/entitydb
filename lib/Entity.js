var Base = require('./Base');
var graph = require('./graph');
var context = require('./context');

var Entity = Base.extend({
  type: "Entity",
  base: "http://open.app/entities/",
  constructor: function (db) {
    if (!db) {
      throw new Error("Entity requires a levelup db!");
    }
    this.db = graph.call(this, db);
    this.context = context(this);
  },
  methods: {
    get: {
      type: 'async',
      fn: function (id, callback) {
        console.log(id);
        this.db.jsonld.get(id, this.context, callback);
      },
      input: {
        id: {
          type: 'string',
          required: true,
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
      },
    },
    del: {
      type: 'async',
      fn: function (id, callback) {
        this.db.jsonld.del(id, callback);
      },
      input: {
        id: {
          type: 'string',
          required: true,
        },
      },
    },
  }
});

module.exports = Entity;