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
var lib_1 = require("../lib");
var BaseTest = /** @class */ (function () {
    function BaseTest() {
    }
    BaseTest.prototype.isa = function () {
        return V.isa(function (v) { return v instanceof Date; }, 'date')
            .validate(new Date());
    };
    BaseTest.prototype.invalidIsa = function () {
        return test_util_1.expectError(V.isa(function (v) { return typeof (v) === 'number'; }, 'number')
            .validate(new Date()));
    };
    BaseTest.prototype.isAny = function () {
        return Promise.all([
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
        ].map(function (item) { return V.isAny.validate(item); }));
    };
    BaseTest.prototype.isLiteral = function () {
        return V.isLiteral('test').validate('test');
    };
    BaseTest.prototype.isInvalidLiteral = function () {
        return test_util_1.expectError(V.isLiteral('test').validate('test1'));
    };
    BaseTest.prototype.isEnum = function () {
        lib_1.ValidationResult.allOf([
            'hello',
            'world',
            'foo'
        ].map(function (item) { return V.isEnum('hello', 'world', 'foo').validate(item); }))
            .cata(function () { });
    };
    BaseTest.prototype.isUndefined = function () {
        return V.isUndefined.validate(undefined);
    };
    BaseTest.prototype.isInvalidUndefined = function () {
        return test_util_1.expectError(V.isUndefined.validate('test'));
    };
    BaseTest.prototype.isNull = function () {
        return V.isNull.validate(null);
    };
    BaseTest.prototype.isInvalidNull = function () {
        return test_util_1.expectError(V.isNull.validate('test'));
    };
    BaseTest.prototype.where = function () {
        return S.isString
            .where(S.match(/^[+-]?\d+$/))
            .validate('12305608');
    };
    BaseTest.prototype.transform = function () {
        return S.isString
            .where(S.match(/^[+-]?\d+(\.\d+)?$/))
            .transform(parseFloat)
            .validate('1234')
            .then(function (v) {
            assert.equal(v, 1234);
        });
    };
    BaseTest.prototype.and = function () {
        var validator = S.isString.and(N.isNumber); // nothing will match!!
        return test_util_1.expectError(validator.validate(1));
    };
    BaseTest.prototype.or = function () {
        var validator = S.isString.or(N.isNumber).or(V.isNull);
        return lib_1.ValidationResult.allOf(['hello', 5].map(function (item) { return validator.validate(item); }))
            .cata(function () { });
    };
    BaseTest.prototype.isOptional = function () {
        var validator = S.isString.isOptional();
        return lib_1.ValidationResult.allOf([undefined, 'test'].map(function (item) { return validator.validate(item); }))
            .cata(function () { });
    };
    BaseTest.prototype.defaultTo = function () {
        var validator = S.isString.defaultTo(function () { return 'hello world'; });
        return validator.validate(undefined)
            .then(function (res) {
            assert.equal(res, 'hello world');
        });
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
    ], BaseTest.prototype, "and", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BaseTest.prototype, "or", null);
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
    BaseTest = __decorate([
        test_util_1.suite
    ], BaseTest);
    return BaseTest;
}());
//# sourceMappingURL=base.js.map