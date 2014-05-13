var test = require('tape');

var level;
var db;
var Entity, Creature, Unicorn;

test("load level db", function (t) {
  level = require('level-test')();
  t.ok(level, "level exists");
  db = level('db');
  t.ok(db, "db exists");
  t.end();
});

test("load Entity", function (t) {
  Entity = require('../');
  t.ok(Entity, "Entity exists");
  t.end();
});

test("create entities", function (t) {
  var entities = new Entity(db)
  t.ok(entities, "entities exists");
  t.ok(entities.get, "entities.get exists");
  t.ok(entities.put, "entities.put exists");
  t.ok(entities.del, "entities.del exists");
  t.ok(entities.methods, "entities.methods exists");
  t.equal(entities.methods.length, 0, "entities.methods is empty");
  t.end();
});

test("extend Entity to Creature", function (t) {
  Creature = Entity.extend({
    type: "Creature",
    properties: {
      name: "string",
      life: "number",
    },
    methods: [{
      live: {
        fn: function (options, callback) {
          var id = options.id;

          this.get(id, function (err, creature) {
            if (err) { throw err; }

            creature.life += 1;

            this.put(id, creature, callback);

          }.bind(this))
        },
        input: {
          id: {
            type: "string",
            required: true,
          },
        },
        output: "Creature",
      },
    }],
    config: {},
  });
  t.ok(Creature, "Creature exists");
  t.end();
});

test("create creatures", function (t) {
  var creatures = new Entity(db)
  t.ok(creatures, "creatures exists");
  t.ok(creatures.get, "creatures.get exists");
  t.ok(creatures.put, "creatures.put exists");
  t.ok(creatures.del, "creatures.del exists");
  t.ok(creatures.live, "creatures.live exists");
  t.ok(creatures.methods, "creatures.methods exists");
  t.ok(creatures.methods.live, "creatures.methods.live exists");
  t.equal(creatures.methods.length, 0, "creatures.methods is empty");
  t.end();
});

test("extend Creature to Unicorn", function (t) {
  Unicorn = Creature.extend({
    type: "Unicorn",
    properties: {
      name: "string",
    },
    methods: [],
    config: {},
  });
  t.ok(Unicorn, "Unicorn exists");
  t.end();
});


test("create unicorns", function (t) {
  var unicorns = new Unicorn(db)
  t.ok(unicorns, "unicorns exists");
  t.ok(unicorns.get, "unicorns.get exists");
  t.ok(unicorns.put, "unicorns.put exists");
  t.ok(unicorns.del, "unicorns.del exists");
  t.ok(unicorns.live, "unicorns.live exists");
  t.ok(unicorns.methods, "unicorns.methods exists");
  t.ok(unicorns.methods.live, "unicorns.methods.live exists");
  t.equal(unicorns.methods.length, 0, "unicorns.methods is empty");
  t.end();
});
