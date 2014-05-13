var _ = require('lodash');
var mschema = require('mschema');

module.exports = function extended (Child) {

  Child.prototype = _.defaults(Child.prototype, {
    properties: {},
    methods: [],
    config: {},
  });

  if (mschema.validate(Child.prototype, {
    properties: {
      type: "string",
      properties: "schema",
      methods: [{
        input: "schema",
        fn: "function",
        output: "schema",
      }],
      config: "object",
    },
  }).valid) {
    throw new Error("Entity attributes are not valid!")
  }

  return Child;
};