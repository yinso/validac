const { BaseValidator } = require('../validator');
const { ValidationResult } = require('../base');

class IsaTupleValidator extends BaseValidator {
    constructor(validators) {
        super();
        this.validators = validators;
    }

    validate(tuple, path = '$') {
        if (!(tuple instanceof Array)) {
            return ValidationResult.reject([{
                error: 'TypeError',
                path: path,
                expected: 'tuple',
                actual: tuple
            }]);
        }
        if (tuple.length !== this.validators.length) {
            return ValidationResult.reject([{
                error: 'InvalidTupleSize',
                path: path,
                expected: this.validators.length,
                actual: tuple
            }])
        } else {
            let errors = [];
            this.validators.forEach((validator, i) => {
                validator.validate(tuple[i], path + '[' + i + ']')
                    .cata(() => {}, (errs) => {
                        errors = errors.concat(errs)
                    })
            });
            if (errors.length > 0) {
                return ValidationResult.reject(errors)
            } else {
                return ValidationResult.resolve(tuple)
            }
        }
    }

    isa(v, path = '$') {
        return this.validate(v, path).cata(() => true, () => false)
    }
}

function isTuple(...validators) {
    return new IsaTupleValidator(validators);
}

exports = module.exports = {
    isTuple: isTuple,
};
