"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this can be replaced with isa((v) ==> 'particular value')
var LiteralValidator = /** @class */ (function () {
    function LiteralValidator(value) {
        this.value = value;
    }
    LiteralValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        if (value === this.value)
            return Promise.resolve(value);
        else
            return Promise.reject([{
                    error: 'InvalidLiteral',
                    path: path,
                    actual: value
                }]);
    };
    return LiteralValidator;
}());
exports.LiteralValidator = LiteralValidator;
///*
function isLiteral(value) {
    return new LiteralValidator(value);
}
exports.isLiteral = isLiteral;
//*/
//# sourceMappingURL=literal.js.map