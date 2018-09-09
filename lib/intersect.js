const B = require('./base');
const S = require('./sequence');

// this one can be a bit difficult to think of... I think it's basically the same as the ThenValidator...
function AndValidator(inners) {
    B.BaseValidator.call(this);
    if (inners.length == 0)
        throw new Error(`AndValidator.zeroValidators`);
    this.validators = inners;
}

AndValidator.prototype = new B.BaseValidator();

AndValidator.prototype.validate = function validate(v, path = '$') {
    let first = this.validators[0];
    let rest = this.validators.slice(1);
    rest.forEach((next) => {
        first = new S.ThenValidator(first, next);
    })
    return first.validate(v, path);
}

function allOf(...validators) {
    return new AndValidator(validators)
}

module.exports = {
    allOf: allOf
}
