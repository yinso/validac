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
var D = require("../../lib/types/date");
var test_util_1 = require("../../lib/util/test-util");
var DateTest = /** @class */ (function () {
    function DateTest() {
    }
    DateTest.prototype.isDate = function () {
        D.isDate.assert(new Date());
    };
    DateTest.prototype.isNotDate = function () {
        ['not a date', 21304987, true, null]
            .forEach(function (v) { return test_util_1.expectError(D.isDate.validate(v)); });
    };
    DateTest.prototype.convertDate = function () {
        D.isDate.toConvert().assert('2000-01-01T00:00:00Z');
    };
    DateTest.prototype.convertNotDate = function () {
        ['not a date', 21304987, true, null]
            .forEach(function (v) { return test_util_1.expectError(D.isDate.toConvert().validate(v)); });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateTest.prototype, "isDate", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateTest.prototype, "isNotDate", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateTest.prototype, "convertDate", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DateTest.prototype, "convertNotDate", null);
    DateTest = __decorate([
        test_util_1.suite
    ], DateTest);
    return DateTest;
}());
//# sourceMappingURL=date.js.map