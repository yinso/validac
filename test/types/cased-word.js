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
    CasedWordTest.prototype.isKebabCaseString = function () {
        S.isKebabCaseString.assert('is-kebab-case');
        test_util_1.expectError(S.isKebabCaseString.validate('notKebabCase'));
        test_util_1.expectError(S.isKebabCaseString.validate('NotKebabCase'));
        test_util_1.expectError(S.isKebabCaseString.validate('not_kebab_case'));
        test_util_1.expectError(S.isKebabCaseString.validate('NOT_KEBAB_CASE'));
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
        assert.equal('is-cased-word', c1.toCase('Kebab'));
        assert.equal('is_cased_word', c1.toCase('Snake'));
        assert.equal('IS_CASED_WORD', c1.toCase('Macro'));
    };
    CasedWordTest.prototype.canAddCustomCase = function () {
        // what does our custom case do?
        // it uses '$' as delimiter, and capitalize the first word.
        S.registerCase({
            caseName: 'Custom',
            isCase: function (v) { return /^([A-Z][a-z0-9]*)(\$[A-Z][a-z0-9]*)*$/.test(v); },
            fromCase: function (str) { return str.split('$').map(function (s) { return s.toLowerCase(); }); },
            toCase: function (words) { return words.map(function (str) { return str[0].toUpperCase() + str.substring(1); }).join('$'); }
        });
        var c1 = new S.CasedWord('Is$Cased$Word');
        assert.equal('Is$Cased$Word', c1.toString());
        assert.equal('isCasedWord', c1.toCase('Camel'));
        assert.equal('IsCasedWord', c1.toCase('Pascal'));
        assert.equal('is-cased-word', c1.toCase('Kebab'));
        assert.equal('is_cased_word', c1.toCase('Snake'));
        assert.equal('IS_CASED_WORD', c1.toCase('Macro'));
        assert.equal('Is$Cased$Word', c1.toCase('Custom'));
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
    ], CasedWordTest.prototype, "isKebabCaseString", null);
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
    __decorate([
        test_util_1.test,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CasedWordTest.prototype, "canAddCustomCase", null);
    CasedWordTest = __decorate([
        test_util_1.suite
    ], CasedWordTest);
    return CasedWordTest;
}());
//# sourceMappingURL=cased-word.js.map