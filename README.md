# entitydb

[![server tests](https://travis-ci.org/entitydb/entitydb.png)](https://travis-ci.org/entitydb/entitydb)
[![npm version](https://badge.fury.io/js/entitydb.png)](https://npmjs.org/package/entitydb)
[![dependency status](https://david-dm.org/entitydb/entitydb.png)](https://david-dm.org/entitydb/entitydb)
[![devDependency status](https://david-dm.org/entitydb/entitydb/dev-status.png)](https://david-dm.org/entitydb/entitydb#info=devDependencies)

[![browser tests](https://ci.testling.com/entitydb/entitydb.png)](https://ci.testling.com/entitydb/entitydb)

leveldb entity system

#### work in progress

## projected features

- [composed of modules](https://github.com/entitydb)
- uses [level-sublevel](https://github.com/dominictarr/level-sublevel) to separate entity databases
- uses [levelgraph-jsonld](https://github.com/mcollina/levelgraph-jsonld) to store entity relationships in a searchable graph
- works on the server or in the browser, see [levelgraph-jsonld#3](http://github.com/mcollina/levelgraph-jsonld/issues/3)
- able to reflect entities over various interfaces similar to [resources](https://github.com/bigcompany/resources)
  - REST api with docs
  - [multilevel](https://github.com/juliangruber/multilevel)
  - IRC
  - README docs
- all entity methods emit events
- all entity methods have pre / post hooks

## how to use

```bash
npm install --save entitydb
```

```javascript
var level = require('level');
var db = level('./db');
var e = require('entitydb');

var CreatureDB = e.DB.extend({
  name: "Creature",
  schema: new e.Schema({
    name: {
      type: e.Types.String,
      required: true,
    },
    karma: {
      type: e.Types.Number,
      default: 0,
    },
  }),
  methods: {
    live: {
      input: new e.Schema({
        id: e.Types.String,
      }),
      output: Creature,
      fn: function (id, callback) {
        var db = this;
        db.get(id, function (err, creature) {
          creature.karma += 1;
          db.put(id, creature, callback);
        });
      },
    },
  },
});

var creatureDb = new Creature(db);

var myId;

creatureDB.put({
  "name": "Mikey",
}, function (err, me) {
  myId = me["@id"];
};

creatureDB.live(myId, function (err, creature) {
  console.log
});
```

## how to develop

```
git clone https://github.com/entitydb/entitydb
npm install
```

hack away!

```
npm test
```

- to run testling locally, you need to install [`xvfb`](http://packages.debian.org/stable/xvfb)
  - `[sudo] apt-get install xvfb`

## license

AGPLv3