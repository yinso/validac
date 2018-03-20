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
    function MapValidator(itemValidator) {
        var _this = _super.call(this) || this;
        _this.itemValidator = itemValidator;
        return _this;
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
}(validator_1.BaseValidator));
function isArray(item) {
    return validator_1.isa(function (v) { return v instanceof Array; }, 'array')
        .then(new MapValidator(item));
}
exports.isArray = isArray;
//# sourceMappingURL=array.js.map