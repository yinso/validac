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
var B = require("./base");
var T = require("./transform");
var S = require("./sequence");
var C = require("./constraint");
var I = require("./intersect");
var U = require("./union");
var convert_1 = require("./convert");
var BaseIsaValidator = /** @class */ (function (_super) {
    __extends(BaseIsaValidator, _super);
    function BaseIsaValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseIsaValidator.prototype.isa = function (value, path) {
        if (path === void 0) { path = '$'; }
        return this.validate(value, path).cata(function (_) { return true; }, function (_) { return false; });
    };
    BaseIsaValidator.prototype.where = function (constraint) {
        return new WrapperIsaValidator(S.sequence(this, C.check(constraint)));
    };
    BaseIsaValidator.prototype.intersect = function (validator) {
        return new WrapperIsaValidator(I.allOf(this, validator));
    };
    BaseIsaValidator.prototype.union = function (validator) {
        return new WrapperIsaValidator(U.oneOf(this, validator));
    };
    BaseIsaValidator.prototype.transform = function (transform) {
        return new WrapperIsaValidator(S.sequence(this, new T.TransformValidator(transform)));
    };
    BaseIsaValidator.prototype.isOptional = function () {
        return new WrapperIsaValidator(U.oneOf(C.check(function (v) { return v === undefined; }), this));
    };
    BaseIsaValidator.prototype.defaultTo = function (defaultProc) {
        return convert_1.wrapConvert(U.oneOf(S.sequence(C.check(function (v) { return v === undefined; }), T.transform(defaultProc)), this));
    };
    BaseIsaValidator.prototype.cast = function () {
        return this;
    };
    BaseIsaValidator.prototype.toConvert = function () {
        return this.transform(function (v) { return v; });
    };
    return BaseIsaValidator;
}(B.BaseValidator));
exports.BaseIsaValidator = BaseIsaValidator;
var WrapperIsaValidator = /** @class */ (function (_super) {
    __extends(WrapperIsaValidator, _super);
    function WrapperIsaValidator(inner) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        return _this;
    }
    WrapperIsaValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        return this.inner.validate(value, path);
    };
    return WrapperIsaValidator;
}(BaseIsaValidator));
exports.WrapperIsaValidator = WrapperIsaValidator;
function wrapIsa(inner) {
    return new WrapperIsaValidator(inner);
}
exports.wrapIsa = wrapIsa;
var TypeofValidator = /** @class */ (function (_super) {
    __extends(TypeofValidator, _super);
    function TypeofValidator(isa, typeName) {
        var _this = _super.call(this) || this;
        _this.isaProc = isa;
        _this.typeName = typeName;
        return _this;
    }
    TypeofValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        if (this.isaProc(value)) {
            return B.ValidationResult.resolve(value);
        }
        else {
            return B.ValidationResult.reject({
                error: 'TypeError',
                expected: this.typeName,
                path: path,
                actual: value
            });
        }
    };
    return TypeofValidator;
}(BaseIsaValidator));
function isa(test, typeName) {
    return new TypeofValidator(test, typeName);
}
exports.isa = isa;
//# sourceMappingURL=isa.js.map