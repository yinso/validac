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
function isValidationError(arg) {
    return !!arg && arg.error && arg.path;
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