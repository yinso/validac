const { wrapIsa } = require('./isa');
const { oneOf } = require('./union');
const { allOf } = require('./intersect');

function isOneOf(...validators) {
    return wrapIsa(oneOf(...validators));
}

function isAllOf(...validators) {
    return wrapIsa(allOf(...validators));
}

module.exports = {
    isOneOf: isOneOf,
    isAllOf: isAllOf
}
