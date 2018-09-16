"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../isa");
var string_1 = require("./string");
Number.isNumber = function (value) { return typeof (value) === 'number'; };
exports.isNumber = isa_1.isa(Number.isNumber, 'number');
exports.isNumber.appendConvert(string_1.isString
    .where(string_1.match(/^[+-]?\d+(\.\d+)?$/))
    .transform(function (v) { return parseFloat(v); }));
exports.convertNumber = exports.isNumber.toConvert();
//# sourceMappingURL=number.js.map