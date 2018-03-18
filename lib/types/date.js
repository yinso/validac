"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../combinators/isa");
exports.isDate = isa_1.isa(function (value) { return value instanceof Date; }, 'date');
//# sourceMappingURL=date.js.map