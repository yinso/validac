"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectMap = exports.ObjectMapIsaValidator = exports.isEmptyObject = exports.ObjectConvertValidator = exports.isObject = exports.ObjectIsaValidator = void 0;
var base_1 = require("../base");
var isa_1 = require("../isa");
var convert_1 = require("../convert");
var cased_word_1 = require("./cased-word");
var _isa_1 = require("../_isa");
var ObjectIsaValidator = /** @class */ (function (_super) {
    __extends(ObjectIsaValidator, _super);
    function ObjectIsaValidator(validatorMap, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.validatorMap = validatorMap;
        _this.rejectUndefinedParam = options.rejectUndefinedParam || false;
        return _this;
    }
    ObjectIsaValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        if (!(value instanceof Object)) {
            return base_1.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'Object',
                    actual: value
                }]);
        }
        var errors = base_1.filterErrors(Object.keys(this.validatorMap).map(function (key) {
            var validator = _this.validatorMap[key];
            if (_this.rejectUndefinedParam && value.hasOwnProperty(key) && value[key] === undefined) {
                return base_1.reject({
                    error: 'UndefinedParameter',
                    path: path + '.' + key,
                    expected: { hasValue: true },
                    actual: { noValue: true }
                });
            }
            return (typeof (validator) === 'function' ? validator() : validator).validate(value[key], path + '.' + key);
        }));
        if (errors.length > 0) {
            return base_1.reject(errors);
        }
        else { // isa validators don't change the values.
            return base_1.resolve(value);
        }
    };
    ObjectIsaValidator.prototype.extends = function (validatorMap) {
        return new ObjectIsaValidator(_extend(this.validatorMap, validatorMap), {
            rejectUndefinedParam: this.rejectUndefinedParam
        });
    };
    ObjectIsaValidator.prototype.field = function (options) {
        var _a, _b;
        var validator = typeof (options.type) === 'function' ? options.type() : options.type;
        if (options.hasOwnProperty('optional') && options['optional'] === true) {
            return new ObjectIsaValidator(__assign(__assign({}, this.validatorMap), (_a = {}, _a[options.key] = validator.isOptional(), _a)));
        }
        else {
            return new ObjectIsaValidator(__assign(__assign({}, this.validatorMap), (_b = {}, _b[options.key] = validator, _b)));
        }
    };
    ObjectIsaValidator.prototype.toConvert = function (options) {
        return _super.prototype.toConvert.call(this, options);
    };
    ObjectIsaValidator.prototype._toConvert = function (options) {
        var _this = this;
        var convertMap = Object.keys(this.validatorMap).reduce(function (acc, key, i) {
            var validator = _this.validatorMap[key];
            acc[key] = (typeof (validator) === 'function' ? validator() : validator).toConvert(options);
            return acc;
        }, {});
        return new ObjectConvertValidator(convertMap, options, {
            rejectUndefinedParam: this.rejectUndefinedParam
        });
    };
    return ObjectIsaValidator;
}(isa_1.BaseIsaValidator));
exports.ObjectIsaValidator = ObjectIsaValidator;
function _extend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var result = {};
    for (var i = 0; i < args.length; ++i) {
        var kv = args[i];
        for (var key in kv) {
            if (kv.hasOwnProperty(key)) {
                result[key] = kv[key];
            }
        }
    }
    return result;
}
function isObject(validatorMap, options) {
    if (options === void 0) { options = {}; }
    return new ObjectIsaValidator(validatorMap, options);
}
exports.isObject = isObject;
var ObjectConvertValidator = /** @class */ (function (_super) {
    __extends(ObjectConvertValidator, _super);
    function ObjectConvertValidator(validatorMap, convertOptions, objectOptions) {
        if (convertOptions === void 0) { convertOptions = {}; }
        if (objectOptions === void 0) { objectOptions = {}; }
        var _this = _super.call(this, convertOptions) || this;
        _this.validatorMap = validatorMap;
        _this.rejectUndefinedParameter = objectOptions.rejectUndefinedParam || false;
        return _this;
    }
    ObjectConvertValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        if (!(value instanceof Object)) {
            return base_1.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'Object',
                    actual: value
                }]);
        }
        var errors = [];
        var keyMap = {};
        var changed = false;
        var results = Object.keys(this.validatorMap).reduce(function (acc, key) {
            var validator = _this.validatorMap[key];
            var objectKey = _this._getKey(key);
            keyMap[objectKey] = key;
            if (_this.rejectUndefinedParameter && value.hasOwnProperty(objectKey) && value[objectKey] === undefined) {
                var e = base_1.reject({
                    error: 'UndefinedParameter',
                    path: path + '.' + key,
                    expected: { hasValue: true },
                    actual: { noValue: true }
                });
                errors = errors.concat(e.errors);
                return acc;
            }
            var propValue = value[objectKey];
            var _validator = _isa_1.isFunction(validator) ? validator() : validator;
            var result = _validator.validate(propValue, path + '.' + key);
            return result.cata(function (v) {
                if (v !== propValue) {
                    changed = true;
                }
                if (v === undefined && _validator instanceof convert_1.OptionalConvertValidator) {
                    // do nothing, because it's an optional property.
                }
                else {
                    acc[key] = v;
                }
                // console.log(`******** ObjectValidator.validate`, key, propValue, v, changed, validator.toString());
                return acc;
            }, function (e) {
                errors = errors.concat(e.errors);
                // console.log(`******** ObjectValidator.validate:ERROR`, key, e.name, acc);
                return acc;
            });
        }, {});
        // console.log(`******** ObjectValidator.validate`, { value, results, keyMap, errors });
        if (errors.length > 0) {
            return base_1.reject(errors);
        }
        else if (!changed) {
            return base_1.resolve(value);
        }
        else {
            Object.keys(value).forEach(function (key) {
                if (!results.hasOwnProperty(keyMap[key])) {
                    results[key] = value[key];
                }
            });
            return base_1.resolve(results);
        }
    };
    ObjectConvertValidator.prototype._getKey = function (key) {
        if (this.convertOptions && this.convertOptions.fromKeyCasing) {
            var cw = new cased_word_1.CasedWord(key);
            return cw.toCase(this.convertOptions.fromKeyCasing);
        }
        else {
            return key;
        }
    };
    ObjectConvertValidator.prototype.extends = function (validatorMap) {
        return new ObjectConvertValidator(_extend(this.validatorMap, validatorMap));
    };
    return ObjectConvertValidator;
}(convert_1.BaseConvertValidator));
exports.ObjectConvertValidator = ObjectConvertValidator;
// export let isEmptyObject : ObjectIsaValidator<{}>;
exports.isEmptyObject = isObject({}).where(function (obj) { return Object.keys(obj).length === 0; });
////// OBJECT MAP
var ObjectMapIsaValidator = /** @class */ (function (_super) {
    __extends(ObjectMapIsaValidator, _super);
    function ObjectMapIsaValidator(validator) {
        var _this = _super.call(this) || this;
        _this.inner = validator;
        return _this;
    }
    ObjectMapIsaValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        if ((value instanceof Buffer) || (value instanceof Array) || !(value instanceof Object)) {
            return base_1.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'Object',
                    actual: value
                }]);
        }
        var errors = base_1.filterErrors(Object.keys(value).map(function (key) {
            var validator = _this.inner;
            return (typeof (validator) === 'function' ? validator() : validator).validate(value[key], path + '.' + key);
        }));
        if (errors.length > 0) {
            return base_1.reject(errors);
        }
        else { // isa validators don't change the values.
            return base_1.resolve(value);
        }
    };
    ObjectMapIsaValidator.prototype._toConvert = function (options) {
        var validator = _isa_1.isFunction(this.inner) ? this.inner() : this.inner;
        var convertMap = validator.toConvert(options);
        return new ObjectMapConvertValidator(convertMap, options);
    };
    return ObjectMapIsaValidator;
}(isa_1.BaseIsaValidator));
exports.ObjectMapIsaValidator = ObjectMapIsaValidator;
var ObjectMapConvertValidator = /** @class */ (function (_super) {
    __extends(ObjectMapConvertValidator, _super);
    function ObjectMapConvertValidator(inner, convertOptions) {
        if (convertOptions === void 0) { convertOptions = {}; }
        var _this = _super.call(this, convertOptions) || this;
        _this.inner = inner;
        return _this;
    }
    ObjectMapConvertValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        if (!(value instanceof Object)) {
            return base_1.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'Object',
                    actual: value
                }]);
        }
        var errors = [];
        var changed = false;
        var keyMap = {};
        var validator = _isa_1.isFunction(this.inner) ? this.inner() : this.inner;
        var results = Object.keys(value).reduce(function (acc, key) {
            var objectKey = _this._getKey(key);
            keyMap[objectKey] = key;
            var propValue = value[objectKey];
            return validator.validate(propValue, path + '.' + key)
                .cata(function (v) {
                if (v !== propValue) {
                    changed = true;
                }
                acc[key] = v;
                return acc;
            }, function (e) {
                errors = errors.concat(e.errors);
                return acc;
            });
        }, {});
        if (errors.length > 0) {
            return base_1.reject(errors);
        }
        else if (!changed) {
            return base_1.resolve(value);
        }
        else {
            Object.keys(value).forEach(function (key) {
                if (!results.hasOwnProperty(keyMap[key])) {
                    results[key] = value[key];
                }
            });
            return base_1.resolve(results);
        }
    };
    ObjectMapConvertValidator.prototype._getKey = function (key) {
        if (this.convertOptions && this.convertOptions.fromKeyCasing) {
            var cw = new cased_word_1.CasedWord(key);
            return cw.toCase(this.convertOptions.fromKeyCasing);
        }
        else {
            return key;
        }
    };
    return ObjectMapConvertValidator;
}(convert_1.BaseConvertValidator));
function isObjectMap(inner) {
    return new ObjectMapIsaValidator(inner);
}
exports.isObjectMap = isObjectMap;
//# sourceMappingURL=object.js.map