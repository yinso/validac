const { wrapConvert } = require('./convert');
const { oneOf } = require('./union');
const { allOf } = require('./intersect');

function convertOneOf(...validators) {
    return wrapConvert(oneOf(...validators));
}

function convertAllOf(...validators) {
    return wrapConvert(allOf(...validators));
}

module.exports = {
    convertOneOf: convertOneOf,
    convertAllOf: convertAllOf
}
