"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var string_1 = require("./string");
var string_2 = require("./string");
exports.isDate = validator_1.isa(function (v) { return v instanceof Date; }, 'Date');
exports.convertDate = string_1.isString
    .where(string_2.match(/^\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d)?Z?$/))
    .transform(function (v) { return new Date(v); });
//# sourceMappingURL=date.js.map