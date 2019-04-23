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
var F = require("../../lib/types/function");
var assert = require("assert");
var N = require("../../lib/types/number");
var test_util_1 = require("../../lib/util/test-util");
var FunctionTest = /** @class */ (function () {
    function FunctionTest() {
    }
    FunctionTest.prototype.isFunction = function () {
        var foo = F.isFunction(N.isNumber, N.isNumber, N.isNumber).attach(function (a, b) { return a + b; });
        // console.log(`************ functionSignature`, (foo as ExplicitAny).__$v)
    };
    FunctionTest.prototype.canCallWithValidation = function () {
        var foo = F.isFunction(N.isNumber, N.isNumber, N.isNumber);
        assert.ok(foo.run(function (a, b) { return a + b; }, 1, 2));
        assert.throws(function () {
            foo.run(function (a, b) { return a + b; }, 'foo', 'bar');
        });
    };
    FunctionTest.prototype.cannotConvertToConvertValidator = function () {
        var foo = F.isFunction(N.isNumber, N.isNumber, N.isNumber);
        assert.throws(function () {
            foo.toConvert();
        });
    };
    FunctionTest.prototype.isAsyncFunction = function () {
        var foo = F.isAsyncFunction(N.isNumber, N.isNumber, N.isNumber).attach(function (a, b) { return Promise.resolve(a + b); });
    };
    FunctionTest.prototype.canCallAsyncWithValidation = function () {
        var foo = F.isAsyncFunction(N.isNumber, N.isNumber, N.isNumber);
        foo.run(function (a, b) { return Promise.resolve(a + b); }, 1, 2)
            .then(function (res) { return assert.ok(res === 3); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FunctionTest.prototype, "isFunction", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FunctionTest.prototype, "canCallWithValidation", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FunctionTest.prototype, "cannotConvertToConvertValidator", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FunctionTest.prototype, "isAsyncFunction", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], FunctionTest.prototype, "canCallAsyncWithValidation", null);
    FunctionTest = __decorate([
        test_util_1.suite
    ], FunctionTest);
    return FunctionTest;
}());
//# sourceMappingURL=function.js.map