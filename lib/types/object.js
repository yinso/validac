const I = require('../isa');
const C = require('../convert');
const B = require('../base');

class IsaObjectValidator extends I.BaseIsaValidator {
    constructor(validatorMap) {
        super();
        this.validatorMap = validatorMap;
    }

    validate(value, path = '$') {
        if (!(value instanceof Object)) {
            return B.ValidationResult.reject([{
                error: 'TypeError',
                path: path,
                expected: 'Object',
                actual: value
            }])
        }
        let errors = B.ValidationResult.filterErrors(Object.keys(this.validatorMap).map((key) => {
            let validator = this.validatorMap[key];
            return validator.validate(value[key], path + '.' + key);
        }))
        if (errors.length > 0) {
            return B.ValidationResult.reject(errors);
        } else { // isa validators don't change the values.
            return B.ValidationResult.resolve(value);
        }
    }

    extends(validatorMap) {
        return new IsaObjectValidator(_extend(this.validatorMap, validatorMap))
    }

    toConvert() {
        let convertMap = this.validatorMap.reduce((acc, key, val) => {
            acc[key] = val.toConvert();
            return acc
        }, acc)
        return new ConvertObjectValidator(convertMap)
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
    return new IsaObjectValidator(validatorMap);
}

class ConvertObjectValidator extends C.BaseConvertValidator {
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
                expected: 'Object',
                actual: value
            }])
        }
        let errors = [];
        let changed = false;
        let results = Object.keys(this.validatorMap).reduce((acc, key) => {
            let validator = this.validatorMap[key];
            let result = validator.validate(value[key], path + '.' + key)
            return result.cata((v) => {
                if (v !== value[key]) {
                    changed = true
                }
                acc[key] = v;
                return acc
            }, (e) => {
                errors = errors.concat(e);
                return acc;
            })
        }, {});
        if (errors.length > 0) {
            return B.ValidationResult.reject(errors);
        } else if (!changed) {
            return B.ValidationResult.resolve(value);
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
        return new ConvertObjectValidator(_extend(this.validatorMap, validatorMap))
    }

}

function convertObject(validatorMap) {
    return new ConvertObjectValidator(validatorMap);
}

exports = module.exports = {
    isObject : isObject,
    convertObject: convertObject
};
