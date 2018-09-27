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
var E = require("../../lib/types/email-address");
var test_util_1 = require("../../lib/util/test-util");
var email1 = 'foo@bar.com';
var email2 = 'John Smith <foo@bar.com>';
var invalidEmail1 = 'not an email';
var UuidTest = /** @class */ (function () {
    function UuidTest() {
    }
    UuidTest.prototype.isEmailAddress = function () {
        E.isEmailAddressString.assert(email1);
        E.isEmailAddressString.assert(email2);
        test_util_1.expectError(E.isEmailAddressString.validate(invalidEmail1));
    };
    UuidTest.prototype.convertEmailAddress = function () {
        var result1 = E.isEmailAddress.convert(email1);
        assert.equal(null, result1.name);
        assert.equal('foo@bar.com', result1.address);
        assert.equal('foo', result1.localPart);
        assert.equal('bar.com', result1.domain);
        var result2 = E.isEmailAddress.convert(email2);
        assert.equal('John Smith', result2.name);
        assert.equal('foo@bar.com', result2.address);
        assert.equal('foo', result2.localPart);
        assert.equal('bar.com', result2.domain);
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UuidTest.prototype, "isEmailAddress", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UuidTest.prototype, "convertEmailAddress", null);
    UuidTest = __decorate([
        test_util_1.suite
    ], UuidTest);
    return UuidTest;
}());
//# sourceMappingURL=email-address.js.map