"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../isa");
exports.isAny = isa_1.isa(function (arg) { return true; }, 'Any');
exports.convertAny = exports.isAny.toConvert();
//# sourceMappingURL=any.js.map