var expect = require('chai').expect;

var level;
var db;
var Entity, Creature, Unicorn;

describe("entitydb", function () {

  before(function () {
    level = require('level-test')();
    db = level('db');
  });

  describe("#Entity", function () {
    
    it("should load Entity", function () {
      Entity = require('../');
      expect(Entity).to.exist;
    });

    it("should create entityDB", function () {
      var entityDB = new Entity(db)
      expect(entityDB).to.exist;
      expect(entityDB.get).to.exist;
      expect(entityDB.put).to.exist;
      expect(entityDB.del).to.exist;
      expect(entityDB.methods).to.exist;
      expect(Object.keys(entityDB.methods).length).to.equal(3);
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

    it("should create creatureDB", function () {
      var creatureDB = new Creature(db)
      expect(creatureDB).to.exist;
      expect(creatureDB.get).to.exist;
      expect(creatureDB.put).to.exist;
      expect(creatureDB.del).to.exist;
      expect(creatureDB.live).to.exist;
      expect(creatureDB.methods).to.exist;
      expect(creatureDB.methods.get).to.exist;
      expect(creatureDB.methods.put).to.exist;
      expect(creatureDB.methods.del).to.exist;
      expect(creatureDB.methods.live).to.exist;
      expect(Object.keys(creatureDB.methods).length).to.equal(4);
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

    it("should create unicornDB", function () {
      var unicornDB = new Unicorn(db)
      expect(unicornDB).to.exist;
      expect(unicornDB.get).to.exist;
      expect(unicornDB.put).to.exist;
      expect(unicornDB.del).to.exist;
      expect(unicornDB.live).to.exist;
      expect(unicornDB.methods).to.exist;
      expect(unicornDB.methods.live).to.exist;
      expect(Object.keys(unicornDB.methods).length).to.equal(4);
    });
  });
});