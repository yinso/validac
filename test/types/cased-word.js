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
var S = require("../../lib/types/cased-word");
var assert = require("assert");
var test_util_1 = require("../../lib/util/test-util");
var CasedWordTest = /** @class */ (function () {
    function CasedWordTest() {
    }
    CasedWordTest.prototype.isCasedWord = function () {
        var c1 = new S.CasedWord('isCasedWord');
        assert.equal(true, S.isCasedWord.isa(c1));
    };
    CasedWordTest.prototype.isCamelCaseString = function () {
        S.isCamelCaseString.assert('isCamelCase');
        test_util_1.expectError(S.isCamelCaseString.validate('NotCamelCase'));
        test_util_1.expectError(S.isCamelCaseString.validate('not-camel-case'));
        test_util_1.expectError(S.isCamelCaseString.validate('not_camel_case'));
        test_util_1.expectError(S.isCamelCaseString.validate('NOT_CAMEL_CASE'));
    };
    CasedWordTest.prototype.isPascalCaseString = function () {
        S.isPascalCaseString.assert('IsPascalCase');
        test_util_1.expectError(S.isPascalCaseString.validate('notPascalCase'));
        test_util_1.expectError(S.isPascalCaseString.validate('not_pascal_case'));
        test_util_1.expectError(S.isPascalCaseString.validate('not-pascal-case'));
        test_util_1.expectError(S.isPascalCaseString.validate('NOT_PASCAL_CASE'));
    };
    CasedWordTest.prototype.isKababCaseString = function () {
        S.isKababCaseString.assert('is-kabab-case');
        test_util_1.expectError(S.isKababCaseString.validate('notKababCase'));
        test_util_1.expectError(S.isKababCaseString.validate('NotKababCase'));
        test_util_1.expectError(S.isKababCaseString.validate('not_kabab_case'));
        test_util_1.expectError(S.isKababCaseString.validate('NOT_KABAB_CASE'));
    };
    CasedWordTest.prototype.isSnakeCaseString = function () {
        S.isSnakeCaseString.assert('is_snake_case');
        test_util_1.expectError(S.isSnakeCaseString.validate('notSnakeCase'));
        test_util_1.expectError(S.isSnakeCaseString.validate('NotSnakeCase'));
        test_util_1.expectError(S.isSnakeCaseString.validate('not-snake-case'));
        test_util_1.expectError(S.isSnakeCaseString.validate('NOT_SNAKE_CASE'));
    };
    CasedWordTest.prototype.isUpperSnakeCaseString = function () {
        S.isMacroCaseString.assert('IS_MACRO_CASE');
        test_util_1.expectError(S.isMacroCaseString.validate('notMacroCase'));
        test_util_1.expectError(S.isMacroCaseString.validate('NotMacroCase'));
        test_util_1.expectError(S.isMacroCaseString.validate('not-macro-case'));
        test_util_1.expectError(S.isMacroCaseString.validate('not_macro_case'));
    };
    CasedWordTest.prototype.canConvertCases = function () {
        var c1 = new S.CasedWord('isCasedWord');
        assert.equal('isCasedWord', c1.toString());
        assert.equal('isCasedWord', c1.toCase('Camel'));
        assert.equal('IsCasedWord', c1.toCase('Pascal'));
        assert.equal('is-cased-word', c1.toCase('Kabab'));
        assert.equal('is_cased_word', c1.toCase('Snake'));
        assert.equal('IS_CASED_WORD', c1.toCase('Macro'));
    };
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CasedWordTest.prototype, "isCasedWord", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CasedWordTest.prototype, "isCamelCaseString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CasedWordTest.prototype, "isPascalCaseString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CasedWordTest.prototype, "isKababCaseString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CasedWordTest.prototype, "isSnakeCaseString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CasedWordTest.prototype, "isUpperSnakeCaseString", null);
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CasedWordTest.prototype, "canConvertCases", null);
    CasedWordTest = __decorate([
        test_util_1.suite
    ], CasedWordTest);
    return CasedWordTest;
}());
//# sourceMappingURL=cased-word.js.map