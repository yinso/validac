"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var literal_1 = require("./literal");
exports.isUndefined = literal_1.isLiteral(undefined, 'undefined');
exports.convertUndefined = exports.isUndefined.toConvert();
exports.isUndefined.toConvert = function () { return exports.convertUndefined; };
//# sourceMappingURL=undefined.js.map