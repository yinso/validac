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
            return base_1.ValidationResult.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'map',
                    actual: arg
                }]);
        }
        var errors = [];
        var result = new Map();
        var input = arg;
        Object.keys(input).map(function (key) {
            _this.innerValidator.validate(input[key], path + "." + key)
                .cata(function (res) {
                result.set(key, res);
            }, function (errs) {
                errors = errors.concat(errs);
            });
        });
        if (errors.length > 0) {
            return base_1.ValidationResult.reject(errors);
        }
        else {
            return base_1.ValidationResult.resolve(result);
        }
    };
    return MapValidator;
}(isa_1.BaseIsaValidator));
function isMap(innerValidator) {
    return new MapValidator(innerValidator);
}
exports.isMap = isMap;
//# sourceMappingURL=map.js.map