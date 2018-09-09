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
var intersect_1 = require("../../lib/intersect");
var isFoo = V.isObject({
    foo: V.isString
});
var isBar = isFoo.extends({
    bar: V.isString
}).cast();
var isBaz = V.isObject({
    xyz: V.isBoolean
}).cast();
var ObjectTest = /** @class */ (function () {
    function ObjectTest() {
    }
    ObjectTest.prototype.canAssert = function () {
        isFoo.assert({
            foo: 'test'
        });
        isBar.assert({
            foo: 'test',
            bar: 'hello'
        });
    };
    ObjectTest.prototype.canIsa = function () {
        assert.deepEqual(true, isFoo.isa({
            foo: 'test'
        }));
        assert.deepEqual(true, isBar.isa({
            foo: 'test',
            bar: 'hello'
        }));
    };
    ObjectTest.prototype.allOf = function () {
        assert.deepEqual(true, V.wrapIsa(intersect_1.allOf(isFoo, isBaz)).isa({
            foo: 'test',
            xyz: true
        }));
    };
    ObjectTest.prototype.assertTypeErrorObject = function () {
        var data = 'not an object';
        V.isObject({}).validate(data)
            .cata(function () { }, function (errors) {
            assert.deepEqual([{
                    error: 'TypeError',
                    path: '$',
                    expected: 'Object',
                    actual: data
                }], errors);
        });
    };
    ObjectTest.prototype.assertKeyTypeError = function () {
        var data = {};
        isFoo.validate(data)
            .cata(function () { }, function (errors) {
            assert.deepEqual([{
                    error: 'TypeError',
                    path: '$.foo',
                    expected: 'string',
                    actual: undefined
                }], errors);
        });
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "canAssert", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "canIsa", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "allOf", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "assertTypeErrorObject", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "assertKeyTypeError", null);
    ObjectTest = __decorate([
        test_util_1.suite
    ], ObjectTest);
    return ObjectTest;
}());
//# sourceMappingURL=object.js.map