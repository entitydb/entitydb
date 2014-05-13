# entitydb

[![server tests](https://travis-ci.org/entitydb/entitydb.png)](https://travis-ci.org/entitydb/entitydb)
[![npm version](https://badge.fury.io/js/entitydb.png)](https://npmjs.org/package/entitydb)
[![dependency status](https://david-dm.org/entitydb/entitydb.png)](https://david-dm.org/entitydb/entitydb)
[![devDependency status](https://david-dm.org/entitydb/entitydb/dev-status.png)](https://david-dm.org/entitydb/entitydb#info=devDependencies)

[![browser tests](https://ci.testling.com/entitydb/entitydb.png)](https://ci.testling.com/entitydb/entitydb)

entity engine for leveldb

#### work in progress

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

creatureDB.put("0", {
  name: "Mikey",
});

creatureDB.live("0", function (err, creature) {
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