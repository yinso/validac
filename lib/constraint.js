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
function Success(v) {
    return {
        isValid: true,
        getResult: function () { return v; },
        getErrors: function () { return []; }
    };
}
exports.Success = Success;
function Failure(error) {
    return {
        isValid: false,
        getResult: function () {
            throw new Error("InvalidResult");
        },
        getErrors: function () { return error instanceof Array ? error : [error]; }
    };
}
exports.Failure = Failure;
function reduceSuccess(results) {
    // what are we returning?
    // all of them would have the same value if they are the same thing!
    var isValid = false;
    var count = -1;
    var errors = [];
    results.forEach(function (res, i) {
        if (res.isValid) {
            isValid = true;
            count = i;
        }
        else {
            errors = errors.concat(res.getErrors());
        }
    });
    if (isValid) {
        return Success(results[count].getResult());
    }
    else {
        return Failure(errors);
    }
}
function reduceErrors(results) {
    // all of them would have the same value if they are the same thing!
    var errors = [];
    results.forEach(function (res) {
        if (!res.isValid) {
            errors = errors.concat(res.getErrors());
        }
    });
    return errors;
}
var BaseConstraint = /** @class */ (function () {
    function BaseConstraint() {
    }
    BaseConstraint.prototype.and = function (constraint) {
        return new AndConstraint(this, constraint);
    };
    BaseConstraint.prototype.or = function (constraint) {
        return new OrConstraint(this, constraint);
    };
    BaseConstraint.prototype.not = function () {
        return new NotConstraint(this);
    };
    return BaseConstraint;
}());
exports.BaseConstraint = BaseConstraint;
var AndConstraint = /** @class */ (function (_super) {
    __extends(AndConstraint, _super);
    function AndConstraint() {
        var constraints = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            constraints[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.constraints = constraints;
        return _this;
    }
    AndConstraint.prototype.validate = function (v, path) {
        var errors = reduceErrors(this.constraints.map(function (constraint) { return constraint.validate(v, path); }));
        if (errors.length > 0) {
            return Failure(errors);
        }
        else {
            return Success(v);
        }
    };
    AndConstraint.prototype.and = function (constraint) {
        return new (AndConstraint.bind.apply(AndConstraint, [void 0].concat(this.constraints, [constraint])))();
    };
    return AndConstraint;
}(BaseConstraint));
var OrConstraint = /** @class */ (function (_super) {
    __extends(OrConstraint, _super);
    function OrConstraint() {
        var constraints = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            constraints[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.constraints = constraints;
        return _this;
    }
    OrConstraint.prototype.validate = function (v, path) {
        // in this case - we are trying to capture the fact that there aren't all errors...
        return reduceSuccess(this.constraints.map(function (constraint) { return constraint.validate(v, path); }));
    };
    OrConstraint.prototype.or = function (constraint) {
        return new (OrConstraint.bind.apply(OrConstraint, [void 0].concat(this.constraints, [constraint])))();
    };
    return OrConstraint;
}(BaseConstraint));
var NotConstraint = /** @class */ (function (_super) {
    __extends(NotConstraint, _super);
    function NotConstraint(constraint) {
        var _this = _super.call(this) || this;
        _this.constraint = constraint;
        return _this;
    }
    NotConstraint.prototype.validate = function (v, path) {
        var result = this.constraint.validate(v, path);
        if (result.isValid) {
            return Failure({
                error: 'NotConstraint',
                constraint: {
                    inner: this.constraint
                },
                path: path,
                actual: v
            });
        }
        else {
            return Success(v);
        }
    };
    NotConstraint.prototype.not = function () {
        return this.constraint;
    };
    return NotConstraint;
}(BaseConstraint));
function not(constraint) {
    return new NotConstraint(constraint);
}
exports.not = not;
var ConstraintValidator = /** @class */ (function () {
    function ConstraintValidator(constraint) {
        this.constraint = constraint;
    }
    ConstraintValidator.prototype.validate = function (v, path) {
        if (path === void 0) { path = '$'; }
        var result = this.constraint.validate(v, path);
        if (result.isValid) {
            return Promise.resolve(result.getResult());
        }
        else {
            return Promise.reject(result.getErrors());
        }
    };
    return ConstraintValidator;
}());
//# sourceMappingURL=constraint.js.map