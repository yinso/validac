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
var A = require("../../lib/types/array");
var S = require("../../lib/types/string");
var test_util_1 = require("../../lib/util/test-util");
var ArrayTest = /** @class */ (function () {
    function ArrayTest() {
    }
    ArrayTest.prototype.isArrayOfString = function () {
        return A.isArray(S.isString).validate(['hello', 'world']);
    };
    ArrayTest.prototype.isInvalidArrayOfString = function () {
        return A.isArray(S.isString).validate(['hello', 'world', 5])
            .then(function (res) {
            throw new Error("Unexpected Success");
        }, function (errors) {
            return;
        });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ArrayTest.prototype, "isArrayOfString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ArrayTest.prototype, "isInvalidArrayOfString", null);
    ArrayTest = __decorate([
        test_util_1.suite
    ], ArrayTest);
    return ArrayTest;
}());
//# sourceMappingURL=array.js.map