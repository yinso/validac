const { ValidationResult } = require('../base');
const { BaseIsaValidator } = require('../isa');
const { BaseConvertValidator } = require('../convert');

class IsaTupleValidator extends BaseIsaValidator {
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
                actual: tuple.length
            }])
        } else {
            let errors = ValidationResult.filterErrors(this.validators.map((validator, i) => {
                return (typeof(validator) === 'function' ? validator() : validator).validate(tuple[i], path + '[' + i + ']')
            }))
            if (errors.length > 0) {
                return ValidationResult.reject(errors)
            } else {
                return ValidationResult.resolve(tuple)
            }
        }
    }

    _toConvert(options) {
        return new ConvertTupleValidator(this.validators.map((v) => (typeof(v) === 'function' ? v() : v).toConvert(options)), options)
    }
}

function isTuple(...validators) {
    return new IsaTupleValidator(validators);
}

class ConvertTupleValidator extends BaseConvertValidator {
    constructor(validators, convertOptions) {
        super(convertOptions);
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
            let changed = false;
            let results = [];
            this.validators.forEach((validator, i) => {
                (typeof(validator) === 'function' ? validator() : validator).validate(tuple[i], path + '[' + i + ']')
                    .cata((v) => {
                        if (v !== tuple[i]) {
                            changed = true
                        }
                        results[i] = v
                    }, (errs) => {
                        errors = errors.concat(errs)
                    })
            });
            if (errors.length > 0) {
                return ValidationResult.reject(errors)
            } else if (!changed) {
                return ValidationResult.resolve(tuple)
            } else {
                return ValidationResult.resolve(results)
            }
        }
    }
}

exports = module.exports = {
    isTuple: isTuple
};
