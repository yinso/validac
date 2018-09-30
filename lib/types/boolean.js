"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../isa");
var literal_1 = require("./literal");
var string_1 = require("./string");
exports.isBoolean = isa_1.isa(function (value) { return typeof (value) === 'boolean'; }, 'boolean');
exports.isTrue = literal_1.isLiteral(true);
exports.isFalse = literal_1.isLiteral(false);
var convertTrueString = string_1.isString.where(string_1.match(/^true$/i)).transform(function () { return true; });
exports.isBoolean.appendConvert(convertTrueString);
exports.isTrue.appendConvert(convertTrueString);
var convertFalseString = string_1.isString.where(string_1.match(/^false$/i)).transform(function () { return false; });
exports.isFalse.appendConvert(convertFalseString);
exports.isBoolean.appendConvert(convertFalseString);
//# sourceMappingURL=boolean.js.map