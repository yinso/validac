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
var IntegerTest = /** @class */ (function () {
    function IntegerTest() {
    }
    IntegerTest.prototype.isInteger = function () {
        return I.isInteger.validate(10);
    };
    IntegerTest.prototype.parseInteger = function () {
        return I.parseInteger.validate('10');
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
    ], IntegerTest.prototype, "parseInteger", null);
    IntegerTest = __decorate([
        test_util_1.suite
    ], IntegerTest);
    return IntegerTest;
}());
//# sourceMappingURL=integer.js.map