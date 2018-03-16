"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("./isa");
var literal_1 = require("./literal");
exports.isString = isa_1.isa(function (value) { return typeof (value) === 'string'; }, 'string');
function isStringLiteral(value) {
    return literal_1.isLiteral(value);
}
exports.isStringLiteral = isStringLiteral;
//# sourceMappingURL=string.js.map