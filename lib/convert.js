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
var BaseConvertValidator = /** @class */ (function (_super) {
    __extends(BaseConvertValidator, _super);
    function BaseConvertValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseConvertValidator.prototype.where = function (constraint) {
        return new WrapperConvertValidator(S.sequence(this, C.check(constraint)));
    };
    BaseConvertValidator.prototype.intersect = function (validator) {
        return new WrapperConvertValidator(I.allOf(this, validator));
    };
    BaseConvertValidator.prototype.union = function (validator) {
        return new WrapperConvertValidator(U.oneOf(this, validator));
    };
    BaseConvertValidator.prototype.transform = function (transform) {
        var trans = new T.TransformValidator(transform);
        var seq = S.sequence(this, trans);
        var wrapper = new WrapperConvertValidator(seq);
        return wrapper;
        return new WrapperConvertValidator(S.sequence(this, new T.TransformValidator(transform)));
    };
    BaseConvertValidator.prototype.isOptional = function () {
        return new WrapperConvertValidator(U.oneOf(C.check(function (v) { return v === undefined; }), this));
    };
    BaseConvertValidator.prototype.defaultTo = function (defaultProc) {
        return new WrapperConvertValidator(U.oneOf(S.sequence(C.check(function (v) { return v === undefined; }), T.transform(defaultProc)), this));
    };
    BaseConvertValidator.prototype.cast = function () {
        return this;
    };
    return BaseConvertValidator;
}(B.BaseValidator));
exports.BaseConvertValidator = BaseConvertValidator;
var WrapperConvertValidator = /** @class */ (function (_super) {
    __extends(WrapperConvertValidator, _super);
    function WrapperConvertValidator(inner) {
        var _this = _super.call(this) || this;
        _this.inner = inner;
        return _this;
    }
    WrapperConvertValidator.prototype.validate = function (value, path) {
        if (path === void 0) { path = '$'; }
        return this.inner.validate(value, path);
    };
    return WrapperConvertValidator;
}(BaseConvertValidator));
exports.WrapperConvertValidator = WrapperConvertValidator;
function wrapConvert(inner) {
    return new WrapperConvertValidator(inner);
}
exports.wrapConvert = wrapConvert;
//# sourceMappingURL=convert.js.map