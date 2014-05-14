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

var AgentDB = e.Graph.extend({
  name: "agents",
  schema: new e.Schema({
    name: {
      type: e.Types.String,
      context: "foaf:name",
      required: true,
    },
  }),
  config: {
    base: "https://agents.open.app",
  }
});

var PersonDB = AgentDB.extend({
  name: "persons",
  schema: new e.Schema({
    account: {
      type: e.Types.String,
      context: "foaf:accountName",
    },
  }),
  config: {
    base: "https://persons.open.app",
  },
});

var personDB = new PersonDB(db);

personDB.put({
  "name": "Mikey",
}, function (err, me) {

  me.put("account", [{
    "@id": "loomio",
    "accountName": "ahdinosaur"
  }, {
    "@id": "cobudget",
    "accountName": "dinosaur"
  }]);
};
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