"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../isa");
var string_1 = require("./string");
exports.isBoolean = isa_1.isa(function (value) { return typeof (value) === 'boolean'; }, 'boolean');
exports.isTrue = isa_1.isLiteral(true);
exports.isFalse = isa_1.isLiteral(false);
exports.convertTrue = exports.isTrue.union(string_1.isString.where(string_1.match(/^true$/i))).transform(function () { return true; });
exports.convertFalse = exports.isFalse.union(string_1.isString.where(string_1.match(/^false$/i))).transform(function (v) { return false; });
exports.convertBoolean = exports.convertTrue.union(exports.convertFalse);
//# sourceMappingURL=boolean.js.map