var test = require('tape');

var level;
var db;
var Entity;

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

test("extend Entity to Person", function (t) {
  var Person = Entity.extend({
    type: "Person",
    properties: {
      name: "string",
    },
    methods: [],
    config: {},
  });
  t.ok(Person, "Person exists");
  t.end();
})