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
var validator_1 = require("../validator");
var MapValidator = /** @class */ (function (_super) {
    __extends(MapValidator, _super);
    function MapValidator(innerValidator) {
        var _this = _super.call(this) || this;
        _this.innerValidator = innerValidator;
        return _this;
    }
    MapValidator.prototype.validate = function (arg, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        if (!(arg instanceof Object)) {
            return Promise.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'map',
                    actual: arg
                }]);
        }
        return new Promise(function (resolve, reject) {
            var errors = [];
            var result = new Map();
            var input = arg;
            return Promise.all(Object.keys(input).map(function (key) {
                return _this.innerValidator.validate(input[key], path + "." + key)
                    .then(function (res) {
                    result.set(key, res);
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
                    resolve(result);
                }
            });
        });
    };
    return MapValidator;
}(validator_1.BaseValidator));
function isMap(innerValidator) {
    return new MapValidator(innerValidator);
}
exports.isMap = isMap;
//# sourceMappingURL=map.js.map