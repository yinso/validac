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
var S = require("../lib/string");
var test_util_1 = require("../lib/test-util");
var StringTest = /** @class */ (function () {
    function StringTest() {
    }
    StringTest.prototype.isString = function () {
        return S.isString.validate('hello');
    };
    StringTest.prototype.isInvalidString = function () {
        return test_util_1.expectError(S.isString.validate(true));
    };
    StringTest.prototype.isStringLiteral = function () {
        return S.isStringLiteral('test').validate('test');
    };
    StringTest.prototype.isInvalidStringLiteral = function () {
        return test_util_1.expectError(S.isStringLiteral('test').validate('wrong'));
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StringTest.prototype, "isString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StringTest.prototype, "isInvalidString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StringTest.prototype, "isStringLiteral", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], StringTest.prototype, "isInvalidStringLiteral", null);
    StringTest = __decorate([
        test_util_1.suite
    ], StringTest);
    return StringTest;
}());
//# sourceMappingURL=string.js.map