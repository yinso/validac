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
var scalar_1 = require("./scalar");
var sequence_1 = require("./sequence");
var isa_1 = require("./isa");
var number_1 = require("./number");
var string_1 = require("./string");
var transform_1 = require("./transform");
var Integer = /** @class */ (function (_super) {
    __extends(Integer, _super);
    function Integer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Integer;
}(scalar_1.Scalar));
exports.Integer = Integer;
exports.isInteger = sequence_1.chain(number_1.isNumber, isa_1.isa(function (v) { return Math.floor(v) === v; }, 'integer'), transform_1.transform(function (v) { return new Integer(v); }));
exports.parseInteger = sequence_1.chain(string_1.isString, isa_1.isa(function (v) { return /^[+-]?\d+$/.test(v); }, 'integer'), transform_1.transform(function (v) { return new Integer(parseInt(v)); }));
//# sourceMappingURL=integer.js.map