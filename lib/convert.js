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
var BaseConvertValidator2 = /** @class */ (function (_super) {
    __extends(BaseConvertValidator2, _super);
    function BaseConvertValidator2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseConvertValidator2.prototype.where = function (constraint) {
        return new WrapperConvertValidator(S.sequence(this, C.check(constraint)));
    };
    BaseConvertValidator2.prototype.intersect = function (validator) {
        return new WrapperConvertValidator(I.allOf(this, validator));
    };
    BaseConvertValidator2.prototype.union = function (validator) {
        return new WrapperConvertValidator(U.oneOf(this, validator));
    };
    BaseConvertValidator2.prototype.transform = function (transform) {
        return new WrapperConvertValidator(S.sequence(this, new T.TransformValidator(transform)));
    };
    BaseConvertValidator2.prototype.isOptional = function () {
        return new WrapperConvertValidator(U.oneOf(C.check(function (v) { return v === undefined; }), this));
    };
    BaseConvertValidator2.prototype.defaultTo = function (defaultProc) {
        return new WrapperConvertValidator(U.oneOf(S.sequence(C.check(function (v) { return v === undefined; }), T.transform(defaultProc)), this));
    };
    BaseConvertValidator2.prototype.cast = function () {
        return this;
    };
    return BaseConvertValidator2;
}(B.BaseValidator));
exports.BaseConvertValidator2 = BaseConvertValidator2;
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
}(BaseConvertValidator2));
exports.WrapperConvertValidator = WrapperConvertValidator;
function wrapConvert(inner) {
    return new WrapperConvertValidator(inner);
}
exports.wrapConvert = wrapConvert;
//# sourceMappingURL=convert.js.map