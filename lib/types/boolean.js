"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var string_1 = require("./string");
exports.isBoolean = validator_1.isa(function (value) { return typeof (value) === 'boolean'; }, 'boolean');
exports.isTrue = validator_1.isLiteral(true);
exports.isFalse = validator_1.isLiteral(false);
exports.parseTrue = exports.isTrue
    .union(string_1.isString.where(string_1.match(/^true$/i)).transform(function (v) { return true; }));
exports.parseFalse = exports.isFalse
    .union(string_1.isString.where(string_1.match(/^false$/i)).transform(function (v) { return false; }));
exports.parseBoolean = exports.parseTrue.union(exports.parseFalse);
//# sourceMappingURL=boolean.js.map