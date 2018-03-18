const { BaseValidator } = require('../validator');

class TupleValidator extends BaseValidator {
    constructor(validators) {
        super();
        this.validators = validators;
    }

    validate(tuple, path = '$') {
        if (!(tuple instanceof Array)) {
            return Promise.reject([{
                error: 'TypeError',
                path: path,
                expected: 'tuple',
                actual: tuple
            }]);
        }
        if (tuple.length !== this.validators.length) {
            return Promise.reject([{
                error: 'InvalidTupleSize',
                path: path,
                expected: this.validators.length,
                actual: tuple
            }])
        } else {
            return new Promise((resolve, reject) => {
                let result = [];
                let errors = [];
                Promise.all(this.validators.map((validator, i) => {
                    return validator.validate(tuple[i], path + '[' + i + ']')
                        .then((res) => {
                            result[i] = res;
                        })
                        .catch((errs) => {
                            errors = errors.concat(errs);
                        });
                }))
                    .then((_) => {
                        if (errors.length > 0) {
                            reject(errors);
                        } else {
                            resolve(result)
                        }
                    });
                });
        }
    }
}

function isTuple(...validators) {
    return new TupleValidator(validators);
}

exports = module.exports = {
    isTuple: isTuple,
};
