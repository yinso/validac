"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var S = require("./string");
var I = require("../isa");
var scalar_1 = require("../scalar");
var camelCaseRegex = /^([a-z][a-z0-9]*)([A-Z][a-z0-9]+)*$/;
var pascalCaseRegex = /^([A-Z][a-z0-9]+)+$/;
var kababCaseRegex = /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/;
var snakeCaseRegex = /^([a-z][a-z0-9]*)(_[a-z0-9]+)*$/;
var upperSnakeCaseRegex = /^([A-Z][A-Z0-9]*)(_[A-Z0-9]+)*$/;
var CasedWord = /** @class */ (function (_super) {
    __extends(CasedWord, _super);
    function CasedWord(word) {
        var _this = _super.call(this, word) || this;
        _this.words = _this._toWords(word);
        return _this;
    }
    CasedWord.prototype.toCamelCase = function () {
        console.log('***** toCamelCase', this.words, this.words[0], this.words.slice(1));
        return [this.words[0]].concat(this.words.slice(1).map(function (w) { return w[0].toUpperCase() + w.substring(1); })).join('');
    };
    CasedWord.prototype.toPascalCase = function () {
        return this.words.map(function (w) { return w[0].toUpperCase() + w.substring(1); }).join('');
    };
    CasedWord.prototype.toSnakeCase = function () {
        return this.words.join('_');
    };
    CasedWord.prototype.toUpperSnakeCase = function () {
        return this.words.map(function (v) { return v.toUpperCase(); }).join('_');
    };
    CasedWord.prototype.toKababCase = function () {
        return this.words.join('-');
    };
    CasedWord.prototype._toWords = function (str) {
        if (camelCaseRegex.test(str)) {
            return this._camelToWords(str);
        }
        else if (pascalCaseRegex.test(str)) {
            return this._pascalToWords(str);
        }
        else if (snakeCaseRegex.test(str)) {
            return this._snakeToWords(str);
        }
        else if (kababCaseRegex.test(str)) {
            return this._kababToWords(str);
        }
        else if (upperSnakeCaseRegex.test(str)) {
            return this._upperSnakeToWords(str);
        }
        else {
            throw new Error("InvalidCaseWord: " + str);
        }
    };
    CasedWord.prototype._snakeToWords = function (str) {
        return str.split('_');
    };
    CasedWord.prototype._upperSnakeToWords = function (str) {
        return str.split('_').map(function (w) { return w.toLowerCase(); });
    };
    CasedWord.prototype._kababToWords = function (str) {
        return str.split('-');
    };
    CasedWord.prototype._camelToWords = function (str) {
        return str.split(/(?=[A-Z])/).map(function (v) { return v.toLowerCase(); });
    };
    CasedWord.prototype._pascalToWords = function (str) {
        return str.split(/(?=[A-Z])/).map(function (v) { return v.toLowerCase(); });
    };
    CasedWord.isCasedWord = I.isa(function (v) { return v instanceof CasedWord; }, 'CasedWord');
    return CasedWord;
}(scalar_1.Scalar));
exports.CasedWord = CasedWord;
exports.isCasedWord = CasedWord.isCasedWord;
exports.isCamelCaseString = S.isString.where(S.match(camelCaseRegex));
exports.isPascalCaseString = S.isString.where(S.match(pascalCaseRegex));
exports.isKababCaseString = S.isString.where(S.match(kababCaseRegex));
exports.isSnakeCaseString = S.isString.where(S.match(snakeCaseRegex));
exports.isUpperSnakeCaseString = S.isString.where(S.match(upperSnakeCaseRegex));
exports.isCasedWord.appendConvert(exports.isCamelCaseString
    .transform(function (v) { return new CasedWord(v); }));
exports.isCasedWord.appendConvert(exports.isPascalCaseString
    .transform(function (v) { return new CasedWord(v); }));
exports.isCasedWord.appendConvert(exports.isKababCaseString
    .transform(function (v) { return new CasedWord(v); }));
exports.isCasedWord.appendConvert(exports.isSnakeCaseString
    .transform(function (v) { return new CasedWord(v); }));
exports.isCasedWord.appendConvert(exports.isUpperSnakeCaseString
    .transform(function (v) { return new CasedWord(v); }));
//# sourceMappingURL=cased-word.js.map