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
        B.isBoolean.assert(true);
        B.isBoolean.assert(false);
    };
    BooleanTest.prototype.parseBoolean = function () {
        B.parseBoolean.assert(true);
        B.parseBoolean.assert(false);
        B.parseBoolean.assert('true');
        B.parseBoolean.assert('false');
        B.parseBoolean.assert('TRUE');
        B.parseBoolean.assert('FALSE');
    };
    BooleanTest.prototype.isTrue = function () {
        B.isTrue.assert(true);
    };
    BooleanTest.prototype.parseTrue = function () {
        B.parseTrue.assert('true');
        B.parseTrue.assert('TRUE');
    };
    BooleanTest.prototype.isFalse = function () {
        B.isFalse.assert(false);
    };
    BooleanTest.prototype.parseFalse = function () {
        B.parseFalse.assert('false');
        B.parseFalse.assert('FALSE');
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
    ], BooleanTest.prototype, "parseBoolean", null);
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
    ], BooleanTest.prototype, "parseTrue", null);
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
    ], BooleanTest.prototype, "parseFalse", null);
    BooleanTest = __decorate([
        test_util_1.suite
    ], BooleanTest);
    return BooleanTest;
}());
//# sourceMappingURL=boolean.js.map