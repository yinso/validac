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
var D = require("../../lib/types/domain-name");
var test_util_1 = require("../../lib/util/test-util");
var domain1 = 'localhost';
var domain2 = 'foobar.com';
var invalidDomain = 'not-a-domain';
var DomainNameTest = /** @class */ (function () {
    function DomainNameTest() {
    }
    DomainNameTest.prototype.isDomainNameString = function () {
        D.isDomainNameString.assert(domain1);
        D.isDomainNameString.assert(domain2);
        test_util_1.expectError(D.isDomainNameString.validate(invalidDomain));
    };
    DomainNameTest.prototype.convertDomainName = function () {
        var result1 = D.isDomainName.convert(domain1);
        assert.equal('localhost', result1.toString());
        var result2 = D.isDomainName.convert(domain2);
        assert.equal('foobar.com', result2.toString());
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DomainNameTest.prototype, "isDomainNameString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DomainNameTest.prototype, "convertDomainName", null);
    DomainNameTest = __decorate([
        test_util_1.suite
    ], DomainNameTest);
    return DomainNameTest;
}());
//# sourceMappingURL=domain-name.js.map