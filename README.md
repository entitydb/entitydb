# entitydb

[![server tests](https://travis-ci.org/entitydb/entitydb.png)](https://travis-ci.org/entitydb/entitydb)
[![npm version](https://badge.fury.io/js/entitydb.png)](https://npmjs.org/package/entitydb)
[![dependency status](https://david-dm.org/entitydb/entitydb.png)](https://david-dm.org/entitydb/entitydb)
[![devDependency status](https://david-dm.org/entitydb/entitydb/dev-status.png)](https://david-dm.org/entitydb/entitydb#info=devDependencies)

[![browser tests](https://ci.testling.com/entitydb/entitydb.png)](https://ci.testling.com/entitydb/entitydb)

entity engine for leveldb

#### work in progress

## features

- uses [mschema](https://github.com/entitydb/mschema) to schema entity objects and methods
- uses [level-sublevel](https://github.com/dominictarr/level-sublevel) to separate databases
- uses [levelgraph-jsonld](https://github.com/mcollina/levelgraph-jsonld) to represent entity relationships in a graph

## projected features

- works on the server or in the browser, see [levelgraph-jsonld#3](http://github.com/mcollina/levelgraph-jsonld/issues/3)
- able to reflect entities over various interfaces similar to [resources](https://github.com/bigcompany/resources)
  - rest api
  - [multilevel](https://github.com/juliangruber/multilevel)
  - irc
  - README docs
- all entity methods emit events
- all entity methods have pre / post hooks

## how to

### install

```
npm install --save entitydb
```

### use

```
var level = require('level');
var db = level('./db');
var Entity = require('entitydb');

var Creature = Entity.extend({
  type: "Creature",
  properties: {
    name: {
      type: "string",
      required: true,
    },
    karma: {
      type: "number",
      default: 0,
    },
  },
  methods: {
    live: {
      input: {
        id: "string",
      },
      output: "Creature",
      fn: function (id, callback) {
        this.get(id, function (err, creature) {
          creature.karma += 1;
          this.put(id, creature, callback);
        }.bind(this));
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

### develop

```
git clone https://github.com/entitydb/entitydb
npm install
```

hack away!

### test

```
npm test
```

- to run testling locally, you need to install [`xvfb`](http://packages.debian.org/stable/xvfb)
  - `[sudo] apt-get install xvfb`

## license

AGPLv3