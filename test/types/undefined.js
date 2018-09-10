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
var U = require("../../lib/types/undefined");
var test_util_1 = require("../../lib/util/test-util");
var UndefinedTest = /** @class */ (function () {
    function UndefinedTest() {
    }
    UndefinedTest.prototype.isUndefined = function () {
        return U.isUndefined.validate(undefined);
    };
    UndefinedTest.prototype.isInvalidUndefined = function () {
        return test_util_1.expectError(U.isUndefined.validate('test'));
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UndefinedTest.prototype, "isUndefined", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UndefinedTest.prototype, "isInvalidUndefined", null);
    UndefinedTest = __decorate([
        test_util_1.suite
    ], UndefinedTest);
    return UndefinedTest;
}());
//# sourceMappingURL=undefined.js.map