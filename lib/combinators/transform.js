"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransformValidator = /** @class */ (function () {
    function TransformValidator(transform) {
        this.transform = transform;
    }
    TransformValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        return new Promise(function (resolve, reject) {
            try {
                resolve(_this.transform(value));
            }
            catch (e) {
                reject([{
                        error: 'TransformError',
                        path: path,
                        actual: value
                    }]);
            }
        });
    };
    return TransformValidator;
}());
function transform(trans) {
    return new TransformValidator(trans);
}
exports.transform = transform;
//# sourceMappingURL=transform.js.map