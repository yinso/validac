"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionalValidator = /** @class */ (function () {
    function OptionalValidator(inner) {
        this.inner = inner;
    }
    OptionalValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        if (value === undefined) {
            return Promise.resolve(value);
        }
        else {
            return this.inner.validate(value, path);
        }
    };
    return OptionalValidator;
}());
exports.OptionalValidator = OptionalValidator;
function isOptional(inner) {
    return new OptionalValidator(inner);
}
exports.isOptional = isOptional;
//# sourceMappingURL=optional.js.map