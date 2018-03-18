"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("../validator");
var DefaultValidator = /** @class */ (function (_super) {
    __extends(DefaultValidator, _super);
    function DefaultValidator(inner, defaultProc) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        _this.defaultProc = defaultProc;
        return _this;
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
}(validator_1.BaseValidator));
exports.DefaultValidator = DefaultValidator;
function withDefault(inner, defaultProc) {
    return new DefaultValidator(inner, defaultProc);
}
exports.withDefault = withDefault;
//# sourceMappingURL=default.js.map