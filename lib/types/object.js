const V = require('../validator');
const B = require('../base');

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
            return B.ValidationResult.reject([{
                error: 'TypeError',
                path: path,
                expected: 'map',
                actual: value
            }])
        }
        let errors = [];
        let results = Object.keys(this.validatorMap).reduce((acc, key) => {
            let validator = this.validatorMap[key];
            let result = validator.validate(value[key], path + '.' + key)
            return result.cata((v) => {
                acc[key] = v;
                return acc
            }, (e) => {
                errors.push(e);
                return acc;
            })
        }, {});
        if (errors.length > 0) {
            return B.ValidationResult.reject(errors);
        } else {
            Object.keys(value).forEach((key) => {
                if (!results.hasOwnProperty(key)) {
                    results[key] = value[key];
                }
            })
            return B.ValidationResult.resolve(results)
        }
    }

    extends(validatorMap) {
        return new ObjectValidator(_extend(this.validatorMap, validatorMap))
    }
}

function _extend() {
    let result = {}
    for (var i = 0; i < arguments.length; ++i) {
        let kv = arguments[i];
        for (var key in kv) {
            if (kv.hasOwnProperty(key)) {
                result[key] = kv[key]
            }
        }        
    }
    return result;
}

function isObject(validatorMap) {
    return new ObjectValidator(validatorMap);
}

exports = module.exports = {
    isObject : isObject
};
