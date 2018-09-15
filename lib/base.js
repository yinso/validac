"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
function isValidator(v) {
    return !!v && typeof (v.assert) === 'function' && typeof (v.validate) === 'function';
}
exports.isValidator = isValidator;
var BaseValidator = /** @class */ (function () {
    function BaseValidator() {
    }
    BaseValidator.prototype.assert = function (value, path) {
        if (path === void 0) { path = '$'; }
        return this.validate(value, path).cata(function (v) { return v; });
    };
    return BaseValidator;
}());
exports.BaseValidator = BaseValidator;
function isConstraint(x) {
    return !!x && typeof (x.satisfy) === 'function'
        && typeof (x.and) === 'function'
        && typeof (x.or) === 'function'
        && typeof (x.not) === 'function';
}
exports.isConstraint = isConstraint;
function isFunction(v) {
    return typeof (v) === 'function' || v instanceof Function;
}
function isArrayOf(isa) {
    return function (v) {
        return !!v && (v instanceof Array) && v.map(isa).filter(function (v) { return v === false; }).length === 0;
    };
}
exports.isArrayOf = isArrayOf;
function isConvertValidator(v) {
    return isValidator(v) && isFunction(v.where)
        && isFunction(v.intersect) && isFunction(v.union) && isFunction(v.isOptional)
        && isFunction(v.transform) && isFunction(v.defaultTo) && isFunction(v.cast);
}
exports.isConvertValidator = isConvertValidator;
function isIsaValidator(v) {
    return isValidator(v) && isFunction(v.isa) && isFunction(v.where)
        && isFunction(v.intersect) && isFunction(v.union) && isFunction(v.isOptional)
        && isFunction(v.transform) && isFunction(v.defaultTo) && isFunction(v.cast)
        && isFunction(v.toConvert);
}
exports.isIsaValidator = isIsaValidator;
function isValidationError(arg) {
    return !!arg && typeof (arg.error) === 'string' && typeof (arg.path) === 'string';
}
exports.isValidationError = isValidationError;
function isValidationErrorArray(arg) {
    return arg instanceof Array && arg.every(isValidationError);
}
exports.isValidationErrorArray = isValidationErrorArray;
var ValidationResult = /** @class */ (function () {
    function ValidationResult() {
    }
    ValidationResult.prototype.toPromise = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.cata(function (res, _) { return resolve(res); }, function (errors, _) { return reject(errors); });
        });
    };
    ValidationResult.prototype.then = function (onSuccess, onError) {
        return this.toPromise().then(onSuccess, onError);
    };
    ValidationResult.resolve = function (value) {
        return new SuccessResult(value);
    };
    ValidationResult.reject = function (e) {
        if (e instanceof Array) {
            return new FailResult(e);
        }
        else {
            return new FailResult([e]);
        }
    };
    ValidationResult.allOf = function (results) {
        // what is the outcome fo the 
        var result = [];
        var errors = [];
        results.forEach(function (res) {
            res.cata(function (value, _) {
                result.push(value);
            }, function (errs, _) {
                errors = errors.concat(errs);
            });
        });
        if (errors.length > 0) {
            return ValidationResult.reject(errors);
        }
        else {
            return ValidationResult.resolve(result);
        }
    };
    ValidationResult.oneOf = function (results) {
        var isValid = false;
        var index = -1;
        var errors = [];
        results.forEach(function (res, i) {
            res.cata(function (r, _) {
                isValid = true,
                    index = i;
            }, function (errs, _) {
                errors = errors.concat(errs);
            });
        });
        if (isValid) {
            return results[index];
        }
        else {
            return ValidationResult.reject(errors);
        }
    };
    ValidationResult.filterErrors = function (results) {
        var errors = [];
        results.forEach(function (res, i) {
            res.cata(function (r, _) {
            }, function (errs, _) {
                errors = errors.concat(errs);
            });
        });
        return errors;
    };
    return ValidationResult;
}());
exports.ValidationResult = ValidationResult;
var SuccessResult = /** @class */ (function (_super) {
    __extends(SuccessResult, _super);
    function SuccessResult(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    SuccessResult.prototype.cata = function (onSuccess, onError) {
        return onSuccess(this.value, this);
    };
    return SuccessResult;
}(ValidationResult));
var FailResult = /** @class */ (function (_super) {
    __extends(FailResult, _super);
    function FailResult(errors) {
        var _this = _super.call(this) || this;
        _this.errors = errors;
        return _this;
    }
    FailResult.prototype.cata = function (onSuccess, onError) {
        if (!onError) {
            throw this;
        }
        else {
            return onError(this.errors, this);
        }
    };
    return FailResult;
}(ValidationResult));
function isValidationResult(item) {
    return !!item && item.hasOwnProperty('isValid');
}
exports.isValidationResult = isValidationResult;
//# sourceMappingURL=base.js.map