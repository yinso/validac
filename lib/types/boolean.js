"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
exports.isBoolean = validator_1.isa(function (value) { return typeof (value) === 'boolean'; }, 'boolean');
exports.isTrue = validator_1.isLiteral(true);
exports.isFalse = validator_1.isLiteral(false);
//# sourceMappingURL=boolean.js.map