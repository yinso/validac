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
var D = require("../../lib/types/date");
var N = require("../../lib/types/number");
var O = require("../../lib/types/object");
var assert = require("assert");
var isArrayOfDates = A.isArray(D.isDate);
var convertArrayOfDates = isArrayOfDates.toConvert();
var ArrayTest = /** @class */ (function () {
    function ArrayTest() {
    }
    ArrayTest.prototype.isArrayOfString = function () {
        A.isArray(S.isString).assert(['hello', 'world']);
    };
    ArrayTest.prototype.isInvalidArrayOfString = function () {
        test_util_1.expectError(A.isArray(S.isString).validate(['hello', 'world', 5]));
    };
    ArrayTest.prototype.canIsa = function () {
        assert.equal(true, A.isArray(S.isString).isa(['test', 'array']));
    };
    ArrayTest.prototype.isArrayofConterDate = function () {
    };
    ArrayTest.prototype.canConvertDates = function () {
        isArrayOfDates.assert(convertArrayOfDates.assert([
            '2018-01-01T00:00:00Z',
            new Date(),
        ]));
    };
    ArrayTest.prototype.convertInvalidDates = function () {
        test_util_1.expectError(convertArrayOfDates.validate([
            'not a date',
            false,
            1234
        ]));
    };
    ArrayTest.prototype.canDoNestedObjectArray = function () {
        var isa = O.isObject({
            result: O.isObject({
                foo: A.isArray(N.isNumber)
            }),
            remainder: S.isString
        });
        assert.equal(true, isa.isa({
            result: {
                foo: [1, 2, 3],
            },
            remainder: 'a remainder'
        }));
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
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ArrayTest.prototype, "canIsa", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ArrayTest.prototype, "isArrayofConterDate", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ArrayTest.prototype, "canConvertDates", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ArrayTest.prototype, "convertInvalidDates", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ArrayTest.prototype, "canDoNestedObjectArray", null);
    ArrayTest = __decorate([
        test_util_1.suite
    ], ArrayTest);
    return ArrayTest;
}());
//# sourceMappingURL=array.js.map