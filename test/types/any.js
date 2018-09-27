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
var A = require("../../lib/types/any");
var test_util_1 = require("../../lib/util/test-util");
var items = [
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
];
var AnyTest = /** @class */ (function () {
    function AnyTest() {
    }
    AnyTest.prototype.isAny = function () {
        items.forEach(function (item) { return A.isAny.assert(item); });
    };
    AnyTest.prototype.convertAny = function () {
        items.forEach(function (item) { return assert.deepEqual(item, A.isAny.convert(item)); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AnyTest.prototype, "isAny", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AnyTest.prototype, "convertAny", null);
    AnyTest = __decorate([
        test_util_1.suite
    ], AnyTest);
    return AnyTest;
}());
//# sourceMappingURL=any.js.map