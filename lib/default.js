"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultValidator = /** @class */ (function () {
    function DefaultValidator(inner, defaultProc) {
        this.inner = inner;
        this.defaultProc = defaultProc;
    }
    DefaultValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        if (value === undefined) {
            return Promise.resolve(this.defaultProc());
        }
        else {
            return this.inner.validate(value, path);
        }
    };
    return DefaultValidator;
}());
exports.DefaultValidator = DefaultValidator;
function withDefault(inner, defaultProc) {
    return new DefaultValidator(inner, defaultProc);
}
exports.withDefault = withDefault;
//# sourceMappingURL=default.js.map