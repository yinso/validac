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
var V = require("../lib/validator");
var S = require("../lib/types/string");
var N = require("../lib/types/number");
var test_util_1 = require("../lib/util/test-util");
var BaseTest = /** @class */ (function () {
    function BaseTest() {
    }
    BaseTest.prototype.isa = function () {
        V.isa(function (v) { return v instanceof Date; }, 'date')
            .assert(new Date());
        assert.deepEqual(true, S.isString.isa('a string'));
    };
    BaseTest.prototype.invalidIsa = function () {
        test_util_1.expectError(V.isa(function (v) { return typeof (v) === 'number'; }, 'number')
            .validate(new Date()));
    };
    BaseTest.prototype.isAny = function () {
        [
            undefined,
            null,
            1,
            0,
            '',
            'hello',
            true,
            false,
            [],
            {}
        ].forEach(function (item) { return V.isAny.assert(item); });
    };
    BaseTest.prototype.isLiteral = function () {
        V.isLiteral('test').assert('test');
    };
    BaseTest.prototype.isInvalidLiteral = function () {
        return test_util_1.expectError(V.isLiteral('test').validate('test1'));
    };
    BaseTest.prototype.isEnum = function () {
        [
            'hello',
            'world',
            'foo'
        ].forEach(function (item) { return V.isEnum('hello', 'world', 'foo').assert(item); });
    };
    BaseTest.prototype.isUndefined = function () {
        return V.isUndefined.validate(undefined);
    };
    BaseTest.prototype.isInvalidUndefined = function () {
        return test_util_1.expectError(V.isUndefined.validate('test'));
    };
    BaseTest.prototype.isNull = function () {
        return V.isNull.validate(null).cata(function () { });
    };
    BaseTest.prototype.isInvalidNull = function () {
        return test_util_1.expectError(V.isNull.validate('test'));
    };
    BaseTest.prototype.where = function () {
        return S.isString
            .where(S.match(/^[+-]?\d+$/))
            .validate('12305608')
            .cata(function () { });
    };
    BaseTest.prototype.transform = function () {
        S.isString
            .where(S.match(/^[+-]?\d+(\.\d+)?$/))
            .transform(parseFloat)
            .validate('1234')
            .cata(function (v) {
            assert.equal(v, 1234);
        });
    };
    BaseTest.prototype.intersect = function () {
        var validator = S.isString.intersect(N.isNumber); // nothing will match!!
        return test_util_1.expectError(validator.validate(1));
    };
    BaseTest.prototype.union = function () {
        var validator = S.isString.union(N.isNumber).union(V.isNull);
        ['hello', 5].forEach(function (item) { return validator.assert(item); });
    };
    BaseTest.prototype.isOptional = function () {
        var validator = S.isString.isOptional();
        [undefined, 'test'].forEach(function (item) { return validator.assert(item); });
    };
    BaseTest.prototype.defaultTo = function () {
        var validator = S.isString.defaultTo(function () { return 'hello world'; });
        validator.assert(undefined);
    };
    BaseTest.prototype.testAllOf = function () {
        var validator = V.allOf(S.isString, V.isLiteral('test'));
        validator.assert('test');
    };
    BaseTest.prototype.testOneOf = function () {
        var validator = V.oneOf(S.isString, V.isNull, N.isNumber);
        validator.assert('test');
        validator.assert(null);
        validator.assert(15.1);
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isa", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "invalidIsa", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isAny", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isLiteral", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isInvalidLiteral", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isEnum", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isUndefined", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isInvalidUndefined", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isNull", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isInvalidNull", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "where", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "transform", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "intersect", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "union", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "isOptional", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "defaultTo", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "testAllOf", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "testOneOf", null);
    BaseTest = __decorate([
        test_util_1.suite
    ], BaseTest);
    return BaseTest;
}());
//# sourceMappingURL=base.js.map