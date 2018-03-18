"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../combinators/isa");
var literal_1 = require("../combinators/literal");
var sequence_1 = require("../combinators/sequence");
var string_1 = require("./string");
var transform_1 = require("../combinators/transform");
exports.isNumber = isa_1.isa(function (value) { return typeof (value) === 'number'; }, 'number');
exports.parseNumber = sequence_1.chain(string_1.isString, isa_1.isa(function (v) { return /^[+-]?\d+(\.\d+)$/.test(v); }, 'number'), transform_1.transform(function (v) { return parseFloat(v); }));
function isNumberLiteral(value) {
    return literal_1.isLiteral(value);
}
exports.isNumberLiteral = isNumberLiteral;
//# sourceMappingURL=number.js.map