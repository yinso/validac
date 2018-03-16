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
// constraint validator doesn't change the type!
var ConstraintValidator = /** @class */ (function () {
    function ConstraintValidator(constraint) {
        this.constraint = constraint;
    }
    ConstraintValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        if (this.constraint(value))
            return Promise.resolve(value);
        else
            return Promise.reject([{
                    error: 'ContraintError',
                    path: path,
                    actual: value
                }]);
    };
    return ConstraintValidator;
}());
var PatternConstraintValidator = /** @class */ (function (_super) {
    __extends(PatternConstraintValidator, _super);
    function PatternConstraintValidator(pattern) {
        return _super.call(this, function (value) { return pattern.test(value); }) || this;
    }
    return PatternConstraintValidator;
}(ConstraintValidator));
function withPattern(pattern) {
    return new PatternConstraintValidator(pattern);
}
//# sourceMappingURL=constraint.js.map