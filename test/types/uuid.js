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
var U = require("../../lib/types/uuid");
var test_util_1 = require("../../lib/util/test-util");
var uuid = require("uuid");
// constraint should also be a combinator thing!!!
var UuidTest = /** @class */ (function () {
    function UuidTest() {
    }
    UuidTest.prototype.isUuid = function () {
        U.isUuidString.assert(uuid.v1());
        U.isUuidString.assert(uuid.v4());
        test_util_1.expectError(U.isUuidString.validate('test'));
        U.isUuid.assert(U.Uuid.fromJSON(uuid.v4()));
    };
    UuidTest.prototype.convertUuid = function () {
        var u1 = uuid.v4();
        var result = U.isUuid.convert(u1);
        assert.equal(u1, result.toString());
        assert.equal(u1, result.valueOf());
        assert.equal(u1, result.toJSON());
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UuidTest.prototype, "isUuid", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], UuidTest.prototype, "convertUuid", null);
    UuidTest = __decorate([
        test_util_1.suite
    ], UuidTest);
    return UuidTest;
}());
//# sourceMappingURL=uuid.js.map