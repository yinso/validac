"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var string_1 = require("./string");
Number.isNumber = function (value) { return typeof (value) === 'number'; };
exports.isNumber = validator_1.isa(Number.isNumber, 'number');
exports.convertNumber = string_1.isString
    .where(string_1.match(/^[+-]?\d+(\.\d+)?$/))
    .transform(function (v) { return parseFloat(v); });
//# sourceMappingURL=number.js.map