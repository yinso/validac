const I = require('../isa');
const C = require('../convert');
const B = require('../base');
const CW = require('./cased-word');

class ObjectIsaValidator extends I.BaseIsaValidator {
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
            return (typeof(validator) === 'function' ? validator() : validator).validate(value[key], path + '.' + key);
        }))
        if (errors.length > 0) {
            return B.ValidationResult.reject(errors);
        } else { // isa validators don't change the values.
            return B.ValidationResult.resolve(value);
        }
    }

    extends(validatorMap) {
        return new ObjectIsaValidator(_extend(this.validatorMap, validatorMap))
    }

    _toConvert(options) {
        let convertMap = Object.keys(this.validatorMap).reduce((acc, key, i) => {
            let validator = this.validatorMap[key];
            acc[key] = (typeof(validator) === 'function' ? validator() : validator).toConvert(options);
            return acc
        }, {})
        return new ObjectConvertValidator(convertMap, options)
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
    return new ObjectIsaValidator(validatorMap);
}

class ObjectConvertValidator extends C.BaseConvertValidator {
    constructor(validatorMap, convertOptions) {
        super(convertOptions);
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
        let keyMap = {};
        let results = Object.keys(this.validatorMap).reduce((acc, key) => {
            let validator = this.validatorMap[key];
            let objectKey = this._getKey(key);
            keyMap[objectKey] = key;
            let propValue = value[objectKey];
            let result = (typeof(validator) === 'function' ? validator() : validator).validate(propValue, path + '.' + key)
            return result.cata((v) => {
                if (v !== propValue) {
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
                if (!results.hasOwnProperty(keyMap[key])) {
                    results[key] = value[key];
                }
            })
            return B.ValidationResult.resolve(results)
        }
    }

    extends(validatorMap) {
        return new ObjectConvertValidator(_extend(this.validatorMap, validatorMap))
    }

    _getKey(key) {
        if (this.convertOptions && this.convertOptions.fromKeyCasing) {
            let cw = new CW.CasedWord(key);
            return cw.toCase(this.convertOptions.fromKeyCasing);
        } else {
            return key;
        }
    }
}

exports = module.exports = {
    isObject : isObject
};
