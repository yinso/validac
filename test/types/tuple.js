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
var V = require("../../lib");
var test_util_1 = require("../../lib/util/test-util");
var assert = require("assert");
var isFoo = V.isTuple(V.isNumber, V.isString, V.isBoolean);
var convertFoo = isFoo.toConvert();
var TupleTest = /** @class */ (function () {
    function TupleTest() {
    }
    TupleTest.prototype.canAssert = function () {
        isFoo.assert([1, 'a string', true]);
    };
    TupleTest.prototype.canIsa = function () {
        assert.deepEqual(true, isFoo.isa([2, 'a string', false]));
        assert.deepEqual(false, isFoo.isa(['a string', 2, false]));
        assert.deepEqual(false, isFoo.isa([2, 'a string', false, 1]));
        assert.deepEqual(false, isFoo.isa([2, 'a string']));
    };
    TupleTest.prototype.canConvertTuple = function () {
        convertFoo.assert(['10', 'a string', 'true']);
    };
    TupleTest.prototype.canConvertRecursiveTuple = function () {
        var isRecursiveTuple = V.isTuple(V.isNumber, V.isString, V.isObject({
            foo: function () { return V.isArray(isRecursiveTuple); }
        }));
        assert.deepEqual(true, isRecursiveTuple.isa([1, 'string', { foo: [
                    [2, 'test', { foo: [] }],
                    [3, 'foo', {
                            foo: [
                                [4, 'bar', { foo: [] }]
                            ]
                        }
                    ]
                ]
            }
        ]));
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TupleTest.prototype, "canAssert", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TupleTest.prototype, "canIsa", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TupleTest.prototype, "canConvertTuple", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TupleTest.prototype, "canConvertRecursiveTuple", null);
    TupleTest = __decorate([
        test_util_1.suite
    ], TupleTest);
    return TupleTest;
}());
//# sourceMappingURL=tuple.js.map