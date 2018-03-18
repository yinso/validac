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
var OptionalValidator = /** @class */ (function (_super) {
    __extends(OptionalValidator, _super);
    function OptionalValidator(inner) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        return _this;
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
}(validator_1.BaseValidator));
exports.OptionalValidator = OptionalValidator;
function isOptional(inner) {
    return new OptionalValidator(inner);
}
exports.isOptional = isOptional;
//# sourceMappingURL=optional.js.map