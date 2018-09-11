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
var base_1 = require("./base");
function isConstraint(x) {
    return !!x && typeof (x.satisfy) === 'function'
        && typeof (x.and) === 'function'
        && typeof (x.or) === 'function'
        && typeof (x.not) === 'function';
}
exports.isConstraint = isConstraint;
function reduceSuccess(results) {
    // what are we returning?
    // all of them would have the same value if they are the same thing!
    var isValid = false;
    var count = -1;
    var errors = [];
    results.forEach(function (res, i) {
        if (res.length == 0) {
            isValid = true;
            count = i;
        }
        else {
            errors = errors.concat(res);
        }
    });
    if (isValid) {
        return [];
    }
    else {
        return errors;
    }
}
function reduceErrors(results) {
    return results.reduce(function (acc, res) {
        return acc.concat(res);
    }, []);
}
// this is the highest level combinator.
// and or not.
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
    AndConstraint.prototype.satisfy = function (v, path) {
        return reduceErrors(this.constraints.map(function (constraint) { return constraint.satisfy(v, path); }));
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
    OrConstraint.prototype.satisfy = function (v, path) {
        return reduceSuccess(this.constraints.map(function (constraint) { return constraint.satisfy(v, path); }));
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
    NotConstraint.prototype.satisfy = function (v, path) {
        var result = this.constraint.satisfy(v, path);
        if (result.length == 0) {
            return [{
                    error: 'NotConstraint',
                    expected: {
                        inner: this.constraint
                    },
                    path: path,
                    actual: v
                }];
        }
        else {
            return [];
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
var PredicateConstraint = /** @class */ (function (_super) {
    __extends(PredicateConstraint, _super);
    function PredicateConstraint(predicate) {
        var _this = _super.call(this) || this;
        _this.predicate = predicate;
        return _this;
    }
    PredicateConstraint.prototype.satisfy = function (v, path) {
        if (this.predicate(v)) {
            return [];
        }
        else {
            return [{
                    error: 'PredicateError',
                    expected: {
                        predicate: this.predicate
                    },
                    path: path,
                    actual: v
                }];
        }
    };
    return PredicateConstraint;
}(BaseConstraint));
function pass(predicate) {
    return new PredicateConstraint(predicate);
}
exports.pass = pass;
var ConstraintValidator = /** @class */ (function (_super) {
    __extends(ConstraintValidator, _super);
    function ConstraintValidator(constraint) {
        var _this = _super.call(this) || this;
        if (isConstraint(constraint)) {
            _this.constraint = constraint;
        }
        else {
            _this.constraint = pass(constraint);
        }
        return _this;
    }
    ConstraintValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        var errors = this.constraint.satisfy(value, path);
        if (errors.length > 0) {
            return base_1.ValidationResult.reject(errors);
        }
        else {
            return base_1.ValidationResult.resolve(value);
        }
    };
    return ConstraintValidator;
}(base_1.BaseValidator));
exports.ConstraintValidator = ConstraintValidator;
function check(constraint) {
    return new ConstraintValidator(constraint);
}
exports.check = check;
//# sourceMappingURL=constraint.js.map