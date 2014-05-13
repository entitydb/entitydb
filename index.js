//
// entityjs - entity engine for javascript
//

var mschema = require('mschema');

// HACK
mschema.types.schema = function (val) {
  if (types.hasOwnProperty(val)) {
    return true;
  } else {
    return typeof val === 'object';
  }
};

var Entity = require('./lib/Entity');

module.exports = Entity;