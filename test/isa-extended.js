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
var E = require("../lib/isa-extended");
var S = require("../lib/types/string");
var N = require("../lib/types/number");
var _N = require("../lib/types/null");
var O = require("../lib/types/object");
var test_util_1 = require("../lib/util/test-util");
var IsOneOfTest = /** @class */ (function () {
    function IsOneOfTest() {
    }
    IsOneOfTest.prototype.canAssert = function () {
        [null, 'a string']
            .forEach(function (v) { return E.isOneOf(_N.isNull, S.isString).assert(v); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsOneOfTest.prototype, "canAssert", null);
    IsOneOfTest = __decorate([
        test_util_1.suite
    ], IsOneOfTest);
    return IsOneOfTest;
}());
var IsAllOfTest = /** @class */ (function () {
    function IsAllOfTest() {
    }
    IsAllOfTest.prototype.canAssert = function () {
        var isFoo = O.isObject({
            foo: N.isNumber
        });
        var isBar = O.isObject({
            bar: S.isString
        });
        [{
                foo: 1, bar: 'a string'
            }].forEach(function (v) { return E.isAllOf(isFoo, isBar).assert(v); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], IsAllOfTest.prototype, "canAssert", null);
    IsAllOfTest = __decorate([
        test_util_1.suite
    ], IsAllOfTest);
    return IsAllOfTest;
}());
//# sourceMappingURL=isa-extended.js.map