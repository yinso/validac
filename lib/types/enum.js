const U = require('../combinators/union');
const L = require('../combinators/literal');

function isEnum(...items) {
    return new U.UnionValidator(items.map((item) => new L.LiteralValidator(item)));
}

exports = module.exports = {
    isStringEnum : isEnum
}

