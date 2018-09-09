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
var U = require("../../lib/types/url");
var test_util_1 = require("../../lib/util/test-util");
// constraint should also be a combinator thing!!!
var UrlTest = /** @class */ (function () {
    function UrlTest() {
    }
    UrlTest.prototype.isUrl = function () {
        U.isUrlString.assert('http://test');
        U.isUrlString.assert('https://test:203');
        test_util_1.expectError(U.isUrlString.validate('test'));
        U.isUrl.assert(U.Url.fromJSON('http://test'));
    };
    UrlTest.prototype.convertUrl = function () {
        var result = U.convertUrl.assert('http://user:pass@host:8080/path1/path2?foo=test&bar=xyz');
        assert.equal('http:', result.protocol);
        assert.equal('user', result.username);
        assert.equal('pass', result.password);
        assert.equal('host:8080', result.host);
        assert.equal('host', result.hostname);
        assert.equal('/path1/path2', result.pathname);
        assert.equal(8080, result.port);
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UrlTest.prototype, "isUrl", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UrlTest.prototype, "convertUrl", null);
    UrlTest = __decorate([
        test_util_1.suite
    ], UrlTest);
    return UrlTest;
}());
//# sourceMappingURL=url.js.map