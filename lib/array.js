"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayValidator = /** @class */ (function () {
    function ArrayValidator() {
    }
    ArrayValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        if (value instanceof Array) {
            return Promise.resolve(value);
        }
        else {
            return Promise.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'array',
                    actual: value
                }]);
        }
    };
    ArrayValidator.prototype.map = function (itemValidator) {
        return new MapValidator(itemValidator);
    };
    return ArrayValidator;
}());
var MapValidator = /** @class */ (function () {
    function MapValidator(itemValidator) {
        this.itemValidator = itemValidator;
    }
    // what we need is the following th
    MapValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        return new Promise(function (resolve, reject) {
            var results = [];
            var errors = [];
            Promise.all(value.map(function (item, i) {
                return _this.itemValidator.validate(item, path + "[" + i + "]")
                    .then(function (res) {
                    results[i] = res;
                })
                    .catch(function (errs) {
                    errors = errors.concat(errs);
                });
            }))
                .then(function (_) {
                if (errors.length > 0) {
                    reject(errors);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    MapValidator.prototype.map = function (itemValidator) {
        return new MapValidator(itemValidator);
    };
    return MapValidator;
}());
function isArray(item) {
    return new ArrayValidator().map(item);
}
exports.isArray = isArray;
//# sourceMappingURL=array.js.map