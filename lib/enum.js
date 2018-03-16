const U = require('./union');
const L = require('./literal');

function isEnum(...items) {
    return new U.UnionValidator(items.map((item) => new L.LiteralValidator(item)));
}

exports = module.exports = {
    isStringEnum : isEnum
}

