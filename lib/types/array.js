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
var base_1 = require("../base");
var isa_1 = require("../isa");
var convert_1 = require("../convert");
var ArrayIsaValidator = /** @class */ (function (_super) {
    __extends(ArrayIsaValidator, _super);
    function ArrayIsaValidator(inner) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        return _this;
    }
    ArrayIsaValidator.prototype.validate = function (arg, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        if (!(arg instanceof Array)) {
            return base_1.ValidationResult.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'Array',
                    actual: arg
                }]);
        }
        var errors = [];
        arg.forEach(function (item, i) {
            _this.inner.validate(item, path + '[' + i + ']')
                .cata(function () { }, function (errs) {
                errors = errors.concat(errs);
            });
        });
        if (errors.length > 0) {
            return base_1.ValidationResult.reject(errors);
        }
        else {
            return base_1.ValidationResult.resolve(arg);
        }
    };
    ArrayIsaValidator.prototype._toConvert = function () {
        return new ArrayConvertValidator(this.inner.toConvert());
    };
    return ArrayIsaValidator;
}(isa_1.BaseIsaValidator));
exports.ArrayIsaValidator = ArrayIsaValidator;
function matchArray(v) {
    return v instanceof Array;
}
exports.matchArray = matchArray;
function isArray(item) {
    return new ArrayIsaValidator(item);
}
exports.isArray = isArray;
var ArrayConvertValidator = /** @class */ (function (_super) {
    __extends(ArrayConvertValidator, _super);
    function ArrayConvertValidator(inner) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        return _this;
    }
    ArrayConvertValidator.prototype.validate = function (arg, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        if (!(arg instanceof Array)) {
            return base_1.ValidationResult.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'Array',
                    actual: arg
                }]);
        }
        var result = [];
        var changed = false;
        var errors = [];
        arg.forEach(function (item, i) {
            _this.inner.validate(item, path + '[' + i + ']')
                .cata(function (value) {
                if (value !== item) {
                    changed = true;
                }
                result[i] = value;
            }, function (errs) {
                errors = errors.concat(errs);
            });
        });
        if (errors.length > 0) {
            return base_1.ValidationResult.reject(errors);
        }
        else if (!changed) {
            return base_1.ValidationResult.resolve(arg);
        }
        else {
            return base_1.ValidationResult.resolve(result);
        }
    };
    return ArrayConvertValidator;
}(convert_1.BaseConvertValidator));
function convertArray(item) {
    return new ArrayConvertValidator(item);
}
exports.convertArray = convertArray;
//# sourceMappingURL=array.js.map