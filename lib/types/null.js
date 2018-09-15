"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var literal_1 = require("./literal");
exports.isNull = literal_1.isLiteral(null, 'null');
exports.convertNull = exports.isNull.toConvert();
exports.isNull.toConvert = function () { return exports.convertNull; };
//# sourceMappingURL=null.js.map