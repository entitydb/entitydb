var _ = require('lodash');

module.exports = function context (Entity) {
  var context = _.zipObject(_.map(Entity.properties, function (prop, name) {
    return [name, name];
  }));

  return {
    "@context": context,
  };
};