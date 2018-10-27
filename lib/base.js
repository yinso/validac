"use strict";
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
        && isFunction(v.transform) && isFunction(v.defaultTo);
}
exports.isConvertValidator = isConvertValidator;
function isConvertValidatorCompat(v) {
    return isConvertValidator(v) || isFunction(v);
}
exports.isConvertValidatorCompat = isConvertValidatorCompat;
var CaseNames;
(function (CaseNames) {
    CaseNames["Camel"] = "Camel";
    CaseNames["Pascal"] = "Pascal";
    CaseNames["Kabab"] = "Kabab";
    CaseNames["Snake"] = "Snake";
    CaseNames["Macro"] = "Macro";
})(CaseNames = exports.CaseNames || (exports.CaseNames = {}));
function isIsaValidator(v) {
    return isValidator(v) && isFunction(v.isa) && isFunction(v.where)
        && isFunction(v.intersect) && isFunction(v.union) && isFunction(v.isOptional)
        && isFunction(v.transform) && isFunction(v.defaultTo) && isFunction(v.toConvert);
}
exports.isIsaValidator = isIsaValidator;
function isIsaValidatorCompat(v) {
    return isIsaValidator(v) || isFunction(v);
}
exports.isIsaValidatorCompat = isIsaValidatorCompat;
function resolve(value) {
    return new SuccessResult(value);
}
exports.resolve = resolve;
function reject(e) {
    if (e instanceof Array) {
        return new FailResult(e);
    }
    else {
        return new FailResult([e]);
    }
}
exports.reject = reject;
function allOf(results) {
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
        return reject(errors);
    }
    else {
        return resolve(result);
    }
}
exports.allOf = allOf;
function oneOf(results) {
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
        return reject(errors);
    }
}
exports.oneOf = oneOf;
function filterErrors(results) {
    var errors = [];
    results.forEach(function (res, i) {
        res.cata(function (r, _) {
        }, function (errs, _) {
            errors = errors.concat(errs);
        });
    });
    return errors;
}
exports.filterErrors = filterErrors;
var SuccessResult = /** @class */ (function () {
    function SuccessResult(value) {
        this.value = value;
    }
    SuccessResult.prototype.cata = function (onSuccess, onError) {
        return onSuccess(this.value, this);
    };
    return SuccessResult;
}());
var FailResult = /** @class */ (function () {
    function FailResult(errors) {
        this.errors = errors;
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
}());
function isValidationResult(item) {
    return !!item && typeof (item.cata) === 'function';
}
exports.isValidationResult = isValidationResult;
function isValidationSuccess(item) {
    return item instanceof SuccessResult;
}
exports.isValidationSuccess = isValidationSuccess;
function isValidationError(item) {
    return item instanceof FailResult;
}
exports.isValidationError = isValidationError;
//# sourceMappingURL=base.js.map