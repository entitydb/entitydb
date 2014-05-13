# entity

[![server tests](https://travis-ci.org/entityjs/entityjs.png)](https://travis-ci.org/entityjs/entityjs)
[![npm version](https://badge.fury.io/js/entityjs.png)](https://npmjs.org/package/entityjs)
[![dependency status](https://david-dm.org/entityjs/entityjs.png)](https://david-dm.org/entityjs/entityjs)
[![devDependency status](https://david-dm.org/entityjs/entityjs/dev-status.png)](https://david-dm.org/entityjs/entityjs#info=devDependencies)

[![browser tests](https://ci.testling.com/entityjs/entityjs.png)](https://ci.testling.com/entityjs/entityjs)

entity engine for leveldb

#### work in progress

## how to

### install

```
npm install --save entityjs
```

### use

```
var level = require('level');
var db = level('./db');
var Entity = require('entityjs');

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

creatures.put("0", {
  name: "Mikey",
});

creatures.live("0", function (err, creature) {
  console.log
});
```

### develop

```
git clone https://github.com/entityjs/entityjs
npm install
```

hack away!

### test

```
npm test
```

- to run testling locally, you need to install [`xvfb`](http://packages.debian.org/stable/xvfb)
  - `[sudo] apt-get install xvfb`