"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isa_1 = require("../isa");
var string_1 = require("./string");
var string_2 = require("./string");
exports.isDate = isa_1.isa(function (v) { return v instanceof Date; }, 'Date');
exports.convertDate = exports.isDate.transform(function (v) { return v; })
    .union(string_1.isString
    .where(string_2.match(/^\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d)?Z?$/))
    .transform(function (v) { return new Date(v); }));
exports.isDate.toConvert = function () { return exports.convertDate; };
//# sourceMappingURL=date.js.map