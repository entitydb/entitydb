var _ = require('lodash');
var mschema = require('mschema');
_.mergeDefaults = require('merge-defaults');

var wrapMethod = require('./wrapMethod');

module.exports = function extended (Child) {

  Child.prototype = _.mergeDefaults(Child.prototype,
    (!_.isEmpty(this.prototype)) ? this.prototype : {
    properties: {},
    methods: {},
    config: {},
  });

  var validation = mschema.validate(Child.prototype, {
    type: {
      type: "string",
      required: true,
    },
    properties: "schema",
    methods: "object",
    // TODO properly validate methods
    // {
    // input: "schema",
    // fn: "function",
    // output: "schema",
    // }
    config: "object",
  });

  if (!validation.valid) {
    throw new Error("Invalid Entity: "
      + JSON.stringify(validation.errors, null, 2)
    );
  }

  _.forEach(Child.prototype.methods, function (method, name) {
    Child.prototype[name] = wrapMethod(method);
  });
};