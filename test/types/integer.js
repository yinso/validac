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
var I = require("../../lib/types/integer");
var test_util_1 = require("../../lib/util/test-util");
// because Integer is a Value Object, we cannot directly validate a *number*.
var IntegerTest = /** @class */ (function () {
    function IntegerTest() {
    }
    IntegerTest.prototype.isInteger = function () {
        I.isInteger.assert(I.Integer.fromJSON(10)); // we want this to be validated.
    };
    IntegerTest.prototype.isNotInteger = function () {
        test_util_1.expectError(I.isInteger.validate(10));
    };
    IntegerTest.prototype.isNumber = function () {
        test_util_1.expectError(I.isInteger.validate(10.5));
    };
    IntegerTest.prototype.parseIntegerFromString = function () {
        I.parseInteger.assert('10');
    };
    IntegerTest.prototype.parseIntegerFromNumber = function () {
        I.parseInteger.assert(10);
    };
    IntegerTest.prototype.parseNumberFail = function () {
        test_util_1.expectError(I.parseInteger.validate('10.5'));
    };
    IntegerTest.prototype.parseNumberFailFromNumber = function () {
        test_util_1.expectError(I.parseInteger.validate(10.5));
    };
    IntegerTest.prototype.fromJSON = function () {
        I.Integer.fromJSON('1');
        I.Integer.fromJSON(1);
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IntegerTest.prototype, "isInteger", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IntegerTest.prototype, "isNotInteger", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IntegerTest.prototype, "isNumber", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IntegerTest.prototype, "parseIntegerFromString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IntegerTest.prototype, "parseIntegerFromNumber", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IntegerTest.prototype, "parseNumberFail", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IntegerTest.prototype, "parseNumberFailFromNumber", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IntegerTest.prototype, "fromJSON", null);
    IntegerTest = __decorate([
        test_util_1.suite
    ], IntegerTest);
    return IntegerTest;
}());
//# sourceMappingURL=integer.js.map