
function Base () {
}

// function to extend new type
Base.extend = require('simple-extend');

// function to be called at extension time
Base.extended = require('./extended');

module.exports = Base;