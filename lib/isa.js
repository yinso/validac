"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// we probably want to create constraint structures as well..!!!
//export type Constraint<T> = (value : T) => boolean;
var IsaValidator = /** @class */ (function () {
    function IsaValidator(isa, type) {
        this.isa = isa;
        this.type = type;
    }
    IsaValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        if (this.isa(value)) {
            return Promise.resolve(value);
        }
        else {
            return Promise.reject([{
                    error: 'TypeError',
                    path: path,
                    actual: value
                }]);
        }
    };
    return IsaValidator;
}());
exports.IsaValidator = IsaValidator;
function isa(pred, type) {
    return new IsaValidator(pred, type);
}
exports.isa = isa;
//# sourceMappingURL=isa.js.map