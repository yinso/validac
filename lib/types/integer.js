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
var scalar_1 = require("../scalar");
var validator_1 = require("../validator");
var number_1 = require("./number");
var string_1 = require("./string");
var Integer = /** @class */ (function (_super) {
    __extends(Integer, _super);
    function Integer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Integer.isInteger = function (v) {
        return v instanceof Integer;
    };
    Integer.fromJSON = function (v, path) {
        if (path === void 0) { path = '$'; }
        return Integer.convertInteger.assert(v, path);
    };
    Integer.convertInteger = string_1.isString
        .where(string_1.match(/^[+-]?\d+$/))
        .transform(function (v) { return new Integer(parseInt(v)); })
        .union(number_1.isNumber
        .where(function (v) { return Math.floor(v) === v; })
        .transform(function (v) { return new Integer(v); }));
    return Integer;
}(scalar_1.Scalar));
exports.Integer = Integer;
exports.isInteger = validator_1.isa(Integer.isInteger, 'isInteger');
exports.convertInteger = Integer.convertInteger;
//# sourceMappingURL=integer.js.map