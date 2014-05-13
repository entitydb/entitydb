var expect = require('chai').expect;

var level;
var db;
var Entity, Creature, Unicorn;

describe("entityjs", function () {

  before(function () {
    level = require('level-test')();
    db = level('db');
  });

  describe("#Entity", function () {
    
    it("should load Entity", function () {
      Entity = require('../');
      expect(Entity).to.exist;
    });

    it("should create entities", function () {
      var entities = new Entity(db)
      expect(entities).to.exist;
      expect(entities.get).to.exist;
      expect(entities.put).to.exist;
      expect(entities.del).to.exist;
      expect(entities.methods).to.exist;
      expect(Object.keys(entities.methods).length).to.equal(3);
    });
  });

  describe("#Creature", function () {

    it("should extend Creature from Entity", function () {
      Creature = Entity.extend({
        type: "Creature",
        properties: {
          name: "string",
          life: "number",
        },
        methods: {
          live: {
            fn: function (id, callback) {

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
        },
        config: {},
      });
      expect(Creature).to.exist;
    });

    it("should create creatures", function () {
      var creatures = new Creature(db)
      expect(creatures).to.exist;
      expect(creatures.get).to.exist;
      expect(creatures.put).to.exist;
      expect(creatures.del).to.exist;
      expect(creatures.live).to.exist;
      expect(creatures.methods).to.exist;
      expect(creatures.methods.get).to.exist;
      expect(creatures.methods.put).to.exist;
      expect(creatures.methods.del).to.exist;
      expect(creatures.methods.live).to.exist;
      expect(Object.keys(creatures.methods).length).to.equal(4);
    });
  });

  describe("#Unicorn", function () {

    it("should extend Unicorn from Creature", function () {
      Unicorn = Creature.extend({
        type: "Unicorn",
        properties: {
          name: "string",
        },
        methods: [],
        config: {},
      });
      expect(Unicorn).to.exist;
    });

    it("should create unicorns", function () {
      var unicorns = new Unicorn(db)
      expect(unicorns).to.exist;
      expect(unicorns.get).to.exist;
      expect(unicorns.put).to.exist;
      expect(unicorns.del).to.exist;
      expect(unicorns.live).to.exist;
      expect(unicorns.methods).to.exist;
      expect(unicorns.methods.live).to.exist;
      expect(Object.keys(unicorns.methods).length).to.equal(4);
    });
  });
});