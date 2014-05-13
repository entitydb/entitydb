var rpc = require('mschema-rpc');

module.exports = function wrapMethod (method) {
  return function methodWrapper () {
    var args = Array.prototype.slice.call(arguments);
    rpc.invoke.apply(this, [method].concat(args));
  };
}