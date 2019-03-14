"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
var CaseNames;
(function (CaseNames) {
    CaseNames["Camel"] = "Camel";
    CaseNames["Pascal"] = "Pascal";
    CaseNames["Kebab"] = "Kebab";
    CaseNames["Snake"] = "Snake";
    CaseNames["Macro"] = "Macro";
})(CaseNames = exports.CaseNames || (exports.CaseNames = {}));
function resolve(value) {
    return new SuccessResult(value);
}
exports.resolve = resolve;
function reject(e) {
    if (isValidationError(e))
        return e;
    if (e instanceof Array) {
        return new ValidationErrorResult(e);
    }
    else {
        return new ValidationErrorResult([e]);
    }
}
exports.reject = reject;
function allOf(results) {
    // what is the outcome fo the 
    var result = [];
    var errors = [];
    results.forEach(function (res) {
        res.cata(function (value) {
            result.push(value);
        }, function (err) {
            errors = errors.concat(err.errors);
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
        res.cata(function (r) {
            isValid = true,
                index = i;
        }, function (err) {
            errors = errors.concat(err.errors);
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
        res.cata(function (r) {
        }, function (err) {
            errors = errors.concat(err.errors);
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
exports.SuccessResult = SuccessResult;
var ValidationErrorResult = /** @class */ (function (_super) {
    __extends(ValidationErrorResult, _super);
    function ValidationErrorResult(errors) {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, ValidationErrorResult.prototype);
        _this.name = 'ValidationError';
        _this.errors = errors;
        return _this;
    }
    ValidationErrorResult.prototype.cata = function (onSuccess, onError) {
        if (!onError) {
            throw this;
        }
        else {
            return onError(this);
        }
    };
    ValidationErrorResult.prototype.toJSON = function () {
        return {
            error: this.name,
            errors: this.errors
        };
    };
    return ValidationErrorResult;
}(Error));
exports.ValidationErrorResult = ValidationErrorResult;
Object.setPrototypeOf(ValidationErrorResult.prototype, Error.prototype); // this is the magic line that saves effort from extending objects.
function isValidationResult(item) {
    return !!item && typeof (item.cata) === 'function';
}
exports.isValidationResult = isValidationResult;
function isValidationSuccess(item) {
    return item instanceof SuccessResult;
}
exports.isValidationSuccess = isValidationSuccess;
function isValidationError(item) {
    return item instanceof ValidationErrorResult;
}
exports.isValidationError = isValidationError;
//# sourceMappingURL=base.js.map