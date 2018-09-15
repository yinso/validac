"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../isa");
exports.isAny = isa_1.isa(function (arg) { return true; }, 'Any');
exports.convertAny = exports.isAny.toConvert();
exports.isAny.toConvert = function () { return exports.convertAny; };
//# sourceMappingURL=any.js.map