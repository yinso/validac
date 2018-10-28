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
var uuid = require("uuid");
var isFoo = V.isObject({
    foo: V.isDate
});
var convertFoo = isFoo.toConvert();
var isBar = isFoo.extends({
    bar: V.isString
});
var isBaz = V.isObject({
    xyz: V.isBoolean
});
var date1S = '2001-01-01T00:00:00Z';
var date1 = new Date(date1S);
var isBaw = isBar.extends({
    nested: V.isArray(V.isString)
});
var isUser = V.isObject({
    userId: V.isUuid,
    userName: V.isEmailAddress,
});
var isUserProfile = isUser.extends({
    phoneNumber: V.isString
});
var ObjectTest = /** @class */ (function () {
    function ObjectTest() {
    }
    ObjectTest.prototype.canAssert = function () {
        isFoo.assert({
            foo: date1
        });
        isBar.assert({
            foo: date1,
            bar: 'hello'
        });
    };
    ObjectTest.prototype.canIsa = function () {
        assert.deepEqual(true, isFoo.isa({
            foo: date1
        }));
        assert.deepEqual(true, isBar.isa({
            foo: date1,
            bar: 'hello'
        }));
    };
    ObjectTest.prototype.allOf = function () {
        assert.deepEqual(true, V.isAllOf(isFoo, isBaz).isa({
            foo: date1,
            xyz: true
        }));
    };
    ObjectTest.prototype.assertTypeErrorObject = function () {
        var data = 'not an object';
        V.isObject({}).validate(data)
            .cata(function () { }, function (errors) {
            assert.deepEqual({
                error: 'ValidationError',
                errors: [{
                        error: 'TypeError',
                        path: '$',
                        expected: 'Object',
                        actual: data
                    }]
            }, errors.toJSON());
        });
    };
    ObjectTest.prototype.assertKeyTypeError = function () {
        var data = {};
        isFoo.validate(data)
            .cata(function () { }, function (errors) {
            assert.deepEqual([{
                    error: 'TypeError',
                    path: '$.foo',
                    expected: 'Date',
                    actual: undefined
                }], errors.errors);
        });
    };
    ObjectTest.prototype.canConvertObject = function () {
        convertFoo.assert({
            foo: date1
        });
        assert.deepEqual({
            foo: date1
        }, convertFoo.assert({
            foo: date1S
        }));
        assert.deepEqual({
            xyz: true
        }, isBaz.convert({
            xyz: 'true'
        }));
    };
    ObjectTest.prototype.canEmbedNestedArray = function () {
        isBaw.convert({
            foo: date1S,
            bar: 'a string',
            nested: [1, true, null, undefined]
        });
    };
    ObjectTest.prototype.canConvertFromDifferentKeyCasing = function () {
        var id = uuid.v4();
        var emailAddress = 'test@test.com';
        var result = isUser.toConvert({
            fromKeyCasing: 'Snake'
        }).assert({
            user_id: id,
            user_name: emailAddress
        });
        assert.deepEqual({
            userId: new V.Uuid(id),
            userName: new V.EmailAddress(emailAddress)
        }, result);
        var phone = '555-555-1212';
        var result2 = isUserProfile.toConvert({
            fromKeyCasing: 'Snake'
        }).assert({
            user_id: id,
            user_name: emailAddress,
            phone_number: phone
        });
        assert.deepEqual({
            userId: new V.Uuid(id),
            userName: new V.EmailAddress(emailAddress),
            phoneNumber: phone
        }, result2);
    };
    ObjectTest.prototype.canDoRecursiveObjectType = function () {
        var isRecursiveFoo = V.isObject({
            foo: V.isString,
            inner: function () { return V.isArray(isRecursiveFoo); }
        });
        assert.deepEqual(true, isRecursiveFoo.isa({
            foo: 'a string',
            inner: [
                {
                    foo: 'test',
                    inner: [
                        {
                            foo: 'test 2',
                            inner: []
                        }
                    ]
                }
            ]
        }));
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
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "canConvertObject", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "canEmbedNestedArray", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "canConvertFromDifferentKeyCasing", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ObjectTest.prototype, "canDoRecursiveObjectType", null);
    ObjectTest = __decorate([
        test_util_1.suite
    ], ObjectTest);
    return ObjectTest;
}());
//# sourceMappingURL=object.js.map