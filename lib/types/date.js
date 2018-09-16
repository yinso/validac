"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../isa");
var string_1 = require("./string");
var string_2 = require("./string");
exports.isDate = isa_1.isa(function (v) { return v instanceof Date; }, 'Date');
exports.isDate.appendConvert(string_1.isString
    .where(string_2.match(/^\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d(\.\d\d\d)?)?(Z|([+-]\d\d:\d\d))?$/))
    .transform(function (v) { return new Date(v); }));
exports.convertDate = exports.isDate.toConvert();
//# sourceMappingURL=date.js.map