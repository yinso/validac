const V = require('../validator');

class ObjectValidator extends V.BaseValidator {
    constructor(validatorMap) {
        super();
        this.validatorMap = validatorMap;
        this.validatorList = [];
        for (var key in validatorMap) {
            if (validatorMap.hasOwnProperty(key)) {
                this.validatorList.push()
            }
        }
    }

    validate(value, path = '$') {
        if (!(value instanceof Object)) {
            return Promise.reject([{
                error: 'TypeError',
                path: path,
                expected: 'object',
                actual: value
            }]);
        }
        return new Promise((resolve, reject) => {
            let result = {};
            let errors = [];
            Promise.all(Object.keys(this.validatorMap).map((key) => {
                let validator = this.validatorMap[key];
                validator.validate(value[key], path + '.' + key)
                    .then((res) => {
                        if ((validator instanceof V.OptionalValidator) && res === undefined) {
                            // do nothing.
                        } else {
                            result[key] = res;
                        }
                    })
                    .catch((errs) => {
                        errors = errors.concat(errs);
                    })
            }))
                .then((res) => {
                    if (errors.length > 0)
                        return reject(errors);
                    return resolve(result);
                })
        })
    }
}

function isObject(validatorMap) {
    return new ObjectValidator(validatorMap);
}

exports = module.exports = {
    isObject : isObject
};
