"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
exports.isDate = validator_1.isa(function (value) { return value instanceof Date; }, 'date');
//# sourceMappingURL=date.js.map