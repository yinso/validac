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
var B = require("../../lib/types/boolean");
var test_util_1 = require("../../lib/util/test-util");
var BooleanTest = /** @class */ (function () {
    function BooleanTest() {
    }
    BooleanTest.prototype.isBoolean = function () {
        [true, false].forEach(function (v) { return B.isBoolean.assert(v); });
    };
    BooleanTest.prototype.isNotBoolean = function () {
        ['true', 'false', 1, 2].forEach(function (v) { return test_util_1.expectError(B.isBoolean.validate(v)); });
    };
    BooleanTest.prototype.convertBoolean = function () {
        [true, false, 'true', 'false', 'TRUE', 'FALSE']
            .forEach(function (v) { return B.isBoolean.toConvert().assert(v); });
    };
    BooleanTest.prototype.convertNotBoolean = function () {
        [1, new Date(), 'not a boolean']
            .forEach(function (v) { return test_util_1.expectError(B.isBoolean.toConvert().validate(v)); });
    };
    BooleanTest.prototype.isTrue = function () {
        B.isTrue.assert(true);
    };
    BooleanTest.prototype.isNotTrue = function () {
        ['true', 'false', 1, 2].forEach(function (v) { return test_util_1.expectError(B.isTrue.validate(v)); });
    };
    BooleanTest.prototype.convertTrue = function () {
        [true, 'true', 'TRUE']
            .forEach(function (v) { return B.isTrue.toConvert().assert(v); });
    };
    BooleanTest.prototype.convertNotTrue = function () {
        [1, new Date(), 'not a boolean']
            .forEach(function (v) { return test_util_1.expectError(B.isTrue.toConvert().validate(v)); });
    };
    BooleanTest.prototype.isFalse = function () {
        B.isFalse.assert(false);
    };
    BooleanTest.prototype.isNotFalse = function () {
        ['true', 'false', 1, 2].forEach(function (v) { return test_util_1.expectError(B.isFalse.validate(v)); });
    };
    BooleanTest.prototype.convertFalse = function () {
        [false, 'false', 'FALSE']
            .forEach(function (v) { return B.isFalse.toConvert().assert(v); });
    };
    BooleanTest.prototype.convertNotFalse = function () {
        [1, new Date(), 'not a boolean']
            .forEach(function (v) { return test_util_1.expectError(B.isBoolean.toConvert().validate(v)); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "isBoolean", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "isNotBoolean", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "convertBoolean", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "convertNotBoolean", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "isTrue", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "isNotTrue", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "convertTrue", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "convertNotTrue", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "isFalse", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "isNotFalse", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "convertFalse", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BooleanTest.prototype, "convertNotFalse", null);
    BooleanTest = __decorate([
        test_util_1.suite
    ], BooleanTest);
    return BooleanTest;
}());
//# sourceMappingURL=boolean.js.map