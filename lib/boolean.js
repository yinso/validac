"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("./isa");
var literal_1 = require("./literal");
exports.isBoolean = isa_1.isa(function (value) { return typeof (value) === 'boolean'; }, 'boolean');
exports.isTrue = literal_1.isLiteral(true);
exports.isFalse = literal_1.isLiteral(false);
//# sourceMappingURL=boolean.js.map