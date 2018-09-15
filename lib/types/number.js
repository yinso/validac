"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../isa");
var string_1 = require("./string");
Number.isNumber = function (value) { return typeof (value) === 'number'; };
exports.isNumber = isa_1.isa(Number.isNumber, 'number');
exports.convertNumber = exports.isNumber.transform(function (v) { return v; })
    .union(string_1.isString
    .where(string_1.match(/^[+-]?\d+(\.\d+)?$/))
    .transform(function (v) { return parseFloat(v); }));
exports.isNumber.toConvert = function () { return exports.convertNumber; };
//# sourceMappingURL=number.js.map