var sublevel = require("level-sublevel");
var levelWriteStream = require("level-writestream");
var levelgraph = require('levelgraph');
var jsonld = require('levelgraph-jsonld');

module.exports = function (db, type) {
  // prepare database for sublevel
  var subbed = sublevel(levelWriteStream(db));
  // create sublevel based on type
  var sub = subbed.sublevel(this.type);
  // create graph from sublevel
  var graph = jsonld(levelgraph(sub), {
    base: this.base || "http://0.0.0.0",
  });

  return graph;
};