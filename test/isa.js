"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var I = require("../lib/isa");
var S = require("../lib/types/string");
var N = require("../lib/types/number");
var _N = require("../lib/types/null");
var L = require("../lib/types/literal");
var X = require("../lib/intersect");
var U = require("../lib/union");
var test_util_1 = require("../lib/util/test-util");
var IsaTest = /** @class */ (function () {
    function IsaTest() {
    }
    IsaTest.prototype.isa = function () {
        I.isa(function (v) { return v instanceof Date; }, 'date')
            .assert(new Date());
        assert.deepEqual(true, S.isString.isa('a string'));
    };
    IsaTest.prototype.invalidIsa = function () {
        test_util_1.expectError(I.isa(function (v) { return typeof (v) === 'number'; }, 'number')
            .validate(new Date()));
    };
    IsaTest.prototype.where = function () {
        return S.isString
            .where(S.match(/^[+-]?\d+$/))
            .validate('12305608')
            .cata(function () { });
    };
    IsaTest.prototype.transform = function () {
        S.isString
            .where(S.match(/^[+-]?\d+(\.\d+)?$/))
            .transform(parseFloat)
            .validate('1234')
            .cata(function (v) {
            assert.equal(v, 1234);
        });
    };
    IsaTest.prototype.intersect = function () {
        var validator = S.isString.intersect(N.isNumber); // nothing will match!!
        return test_util_1.expectError(validator.validate(1));
    };
    IsaTest.prototype.union = function () {
        var validator = S.isString.union(N.isNumber).union(_N.isNull);
        ['hello', 5].forEach(function (item) { return validator.assert(item); });
    };
    IsaTest.prototype.isOptional = function () {
        var validator = S.isString.isOptional();
        [undefined, 'test'].forEach(function (item) { return validator.assert(item); });
    };
    IsaTest.prototype.defaultTo = function () {
        var validator = S.isString.defaultTo(function () { return 'hello world'; });
        validator.assert(undefined);
    };
    IsaTest.prototype.testAllOf = function () {
        var validator = X.allOf(S.isString, L.isLiteral('test'));
        validator.assert('test');
    };
    IsaTest.prototype.testOneOf = function () {
        var validator = U.oneOf(S.isString, _N.isNull, N.isNumber);
        validator.assert('test');
        validator.assert(null);
        validator.assert(15.1);
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "isa", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "invalidIsa", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "where", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "transform", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "intersect", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "union", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "isOptional", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "defaultTo", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "testAllOf", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsaTest.prototype, "testOneOf", null);
    IsaTest = __decorate([
        test_util_1.suite
    ], IsaTest);
    return IsaTest;
}());
//# sourceMappingURL=isa.js.map