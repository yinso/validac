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
var E = require("../../lib/types/enum");
var test_util_1 = require("../../lib/util/test-util");
var isFoo = E.isEnum('hello', 'world', 'foo');
var convertFoo = isFoo.toConvert();
var EnumTest = /** @class */ (function () {
    function EnumTest() {
    }
    EnumTest.prototype.isEnum = function () {
        [
            'hello',
            'world',
            'foo'
        ].forEach(function (item) { return isFoo.assert(item); });
    };
    EnumTest.prototype.isNotEnum = function () {
        [
            'xyz',
            'abc',
            'def'
        ].forEach(function (item) { return test_util_1.expectError(isFoo.validate(item)); });
    };
    EnumTest.prototype.canConvertEnum = function () {
        [
            'hello',
            'world',
            'foo'
        ].forEach(function (item) { return convertFoo.assert(item); });
    };
    EnumTest.prototype.errorConvertInvalidEnum = function () {
        [
            'xyz',
            'abc',
            'def'
        ].forEach(function (item) { return test_util_1.expectError(convertFoo.validate(item)); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], EnumTest.prototype, "isEnum", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], EnumTest.prototype, "isNotEnum", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], EnumTest.prototype, "canConvertEnum", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], EnumTest.prototype, "errorConvertInvalidEnum", null);
    EnumTest = __decorate([
        test_util_1.suite
    ], EnumTest);
    return EnumTest;
}());
//# sourceMappingURL=enum.js.map