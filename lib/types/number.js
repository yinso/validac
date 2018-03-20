"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var string_1 = require("./string");
exports.isNumber = validator_1.isa(function (value) { return typeof (value) === 'number'; }, 'number');
exports.parseNumber = string_1.isString
    .where(string_1.match(/^[+-]?\d+(\.\d+)$/))
    .transform(function (v) { return parseFloat(v); });
//# sourceMappingURL=number.js.map