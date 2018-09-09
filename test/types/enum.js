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
var EnumTest = /** @class */ (function () {
    function EnumTest() {
    }
    EnumTest.prototype.isEnum = function () {
        var testEnum = E.isEnum('hello', 'world', 'foo');
        [
            'hello',
            'world',
            'foo'
        ].forEach(function (item) { return testEnum.assert(item); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], EnumTest.prototype, "isEnum", null);
    EnumTest = __decorate([
        test_util_1.suite
    ], EnumTest);
    return EnumTest;
}());
//# sourceMappingURL=enum.js.map