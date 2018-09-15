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
var constraint_1 = require("../constraint");
var isa_1 = require("../isa");
var any_1 = require("./any");
exports.isString = isa_1.isa(function (value) { return typeof (value) === 'string'; }, 'string');
exports.convertString = exports.isString.transform(function (v) { return v; })
    .union(any_1.isAny.transform(function (v) {
    if (v === undefined) {
        return '';
    }
    else if (v === null) {
        return '';
    }
    else if (v instanceof Date) {
        return v.toISOString();
    }
    else {
        return v.toString();
    }
}));
//isString.toConvert = () => convertString
var MatchConstraint = /** @class */ (function (_super) {
    __extends(MatchConstraint, _super);
    function MatchConstraint(pattern) {
        var _this = _super.call(this) || this;
        _this.pattern = pattern;
        return _this;
    }
    MatchConstraint.prototype.satisfy = function (v, path) {
        if (this.pattern.test(v)) {
            return [];
        }
        else {
            return [{
                    error: 'MatchConstraint',
                    expected: {
                        pattern: this.pattern
                    },
                    path: path,
                    actual: v
                }];
        }
    };
    return MatchConstraint;
}(constraint_1.BaseConstraint));
function match(pattern) {
    return new MatchConstraint(pattern);
}
exports.match = match;
var MinLengthConstraint = /** @class */ (function (_super) {
    __extends(MinLengthConstraint, _super);
    function MinLengthConstraint(minLength, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        var _this = _super.call(this) || this;
        _this.minLength = minLength;
        _this.inclusive = inclusive;
        return _this;
    }
    MinLengthConstraint.prototype._satisfy = function (v) {
        return this.inclusive ? v.length >= this.minLength : v.length > this.minLength;
    };
    MinLengthConstraint.prototype.satisfy = function (v, path) {
        if (this._satisfy(v)) {
            return [];
        }
        else {
            return [{
                    error: 'MinLengthConstraint',
                    expected: {
                        minLength: this.minLength,
                        minLengthInclusive: this.inclusive
                    },
                    path: path,
                    actual: v
                }];
        }
    };
    return MinLengthConstraint;
}(constraint_1.BaseConstraint));
function minLength(minLength, inclusive) {
    return new MinLengthConstraint(minLength, inclusive);
}
exports.minLength = minLength;
var MaxLengthConstraint = /** @class */ (function (_super) {
    __extends(MaxLengthConstraint, _super);
    function MaxLengthConstraint(maxLength, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        var _this = _super.call(this) || this;
        _this.maxLength = maxLength;
        _this.inclusive = inclusive;
        return _this;
    }
    MaxLengthConstraint.prototype._satisfy = function (v) {
        return this.inclusive ? v.length <= this.maxLength : v.length < this.maxLength;
    };
    MaxLengthConstraint.prototype.satisfy = function (v, path) {
        if (this._satisfy(v)) {
            return [];
        }
        else {
            return [{
                    error: 'MaxLengthConstraint',
                    expected: {
                        maxLength: this.maxLength,
                        maxLengthInclusive: this.inclusive
                    },
                    path: path,
                    actual: v
                }];
        }
    };
    return MaxLengthConstraint;
}(constraint_1.BaseConstraint));
function maxLength(minLength, inclusive) {
    return new MaxLengthConstraint(minLength, inclusive);
}
exports.maxLength = maxLength;
//# sourceMappingURL=string.js.map