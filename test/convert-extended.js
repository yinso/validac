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
var E = require("../lib/convert-extended");
var S = require("../lib/types/string");
var N = require("../lib/types/number");
var O = require("../lib/types/object");
var test_util_1 = require("../lib/util/test-util");
var ConvertOneOfTest = /** @class */ (function () {
    function ConvertOneOfTest() {
    }
    ConvertOneOfTest.prototype.canAssert = function () {
        ['1234', 'a string']
            .forEach(function (v) { return E.convertOneOf(N.convertNumber, S.convertString).assert(v); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ConvertOneOfTest.prototype, "canAssert", null);
    ConvertOneOfTest = __decorate([
        test_util_1.suite
    ], ConvertOneOfTest);
    return ConvertOneOfTest;
}());
var ConvertAllOfTest = /** @class */ (function () {
    function ConvertAllOfTest() {
    }
    ConvertAllOfTest.prototype.canAssert = function () {
        var isFoo = O.convertObject({
            foo: N.convertNumber
        });
        var isBar = O.convertObject({
            bar: S.convertString
        });
        [
            {
                foo: 1, bar: 'a string'
            },
            {
                foo: '10', bar: true
            },
        ].forEach(function (v) { return E.convertAllOf(isFoo, isBar).assert(v); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ConvertAllOfTest.prototype, "canAssert", null);
    ConvertAllOfTest = __decorate([
        test_util_1.suite
    ], ConvertAllOfTest);
    return ConvertAllOfTest;
}());
//# sourceMappingURL=convert-extended.js.map