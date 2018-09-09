const B = require('./base');

function OrValidator(validators) {
    B.BaseValidator.call(this);
    this.validators = validators;
}

OrValidator.prototype = new B.BaseValidator();

OrValidator.prototype.validate = function validate(value, path = '$') {
    // this is where we need to make it the same API?
    // do I want ValidationResult to have the same API as Promise?
    // i.e. we can contruct it where it would take a 
    // I think it wouldn't have the same API, but we need something simliar.
    // i.e. ValidationResult.all
    // ValidationResult.map
    // etc.
    return B.ValidationResult.oneOf(this.validators.map((validator) => validator.validate(value, path)));
}

function oneOf(...validators) {
    return new OrValidator(validators);
}

module.exports = {
    oneOf: oneOf
}