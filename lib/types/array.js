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
var base_1 = require("../base");
var isa_1 = require("../isa");
var convert_1 = require("../convert");
var IsArrayValidator = /** @class */ (function (_super) {
    __extends(IsArrayValidator, _super);
    function IsArrayValidator(inner) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        return _this;
    }
    IsArrayValidator.prototype.validate = function (arg, path) {
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
    IsArrayValidator.prototype.toConvert = function () {
        return new ConvertArrayValidator(this.inner.toConvert());
    };
    return IsArrayValidator;
}(isa_1.BaseIsaValidator));
var MapValidator = /** @class */ (function (_super) {
    __extends(MapValidator, _super);
    function MapValidator(itemValidator) {
        var _this = _super.call(this) || this;
        _this.itemValidator = itemValidator;
        return _this;
    }
    // what we need is the following th
    MapValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        var results = value.map(function (item, i) { return _this.itemValidator.validate(item, path + "[" + i + "]"); });
        // what do I do with the results? I want to flatten the results?
        return base_1.ValidationResult.allOf(results);
    };
    MapValidator.prototype.map = function (itemValidator) {
        return new MapValidator(itemValidator);
    };
    return MapValidator;
}(isa_1.BaseIsaValidator));
function matchArray(v) {
    return v instanceof Array;
}
exports.matchArray = matchArray;
function isArray(item) {
    return new IsArrayValidator(item);
}
exports.isArray = isArray;
var ConvertArrayValidator = /** @class */ (function (_super) {
    __extends(ConvertArrayValidator, _super);
    function ConvertArrayValidator(inner) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        return _this;
    }
    ConvertArrayValidator.prototype.validate = function (arg, path) {
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
    return ConvertArrayValidator;
}(convert_1.BaseConvertValidator));
function convertArray(item) {
    return new ConvertArrayValidator(item);
}
exports.convertArray = convertArray;
//# sourceMappingURL=array.js.map