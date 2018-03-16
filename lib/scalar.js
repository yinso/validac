"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scalar = /** @class */ (function () {
    function Scalar(value) {
        this._value = value;
    }
    Scalar.prototype.valueOf = function () { return this._value; };
    Scalar.prototype.toString = function () { return this._value.toString(); };
    Scalar.prototype.toJSON = function () { return this._value; };
    return Scalar;
}());
exports.Scalar = Scalar;
//# sourceMappingURL=scalar.js.map