"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("./base");
var TransformValidator = /** @class */ (function () {
    function TransformValidator(transformProc) {
        this.transformProc = transformProc;
    }
    TransformValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        try {
            var result = this.transformProc(value);
            return B.ValidationResult.resolve(result);
        }
        catch (e) {
            return B.ValidationResult.reject(e);
        }
    };
    TransformValidator.prototype.assert = function (value, path) {
        if (path === void 0) { path = '$'; }
        return this.validate(value, path).cata(function (v) {
            return v;
        });
    };
    return TransformValidator;
}());
exports.TransformValidator = TransformValidator;
function transform(transformProc) {
    return new TransformValidator(transformProc);
}
exports.transform = transform;
//# sourceMappingURL=transform.js.map