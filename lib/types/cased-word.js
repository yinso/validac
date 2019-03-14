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
var kebabCaseRegex = /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/;
var snakeCaseRegex = /^([a-z][a-z0-9]*)(_[a-z0-9]+)*$/;
var macroCaseRegex = /^([A-Z][A-Z0-9]*)(_[A-Z0-9]+)*$/;
var caseRegistry = {};
function registerCase(options) {
    if (caseRegistry.hasOwnProperty(options.caseName)) {
        throw new Error("DuplicateCasing: " + options.caseName);
    }
    caseRegistry[options.caseName] = options;
}
exports.registerCase = registerCase;
function fromCase(str) {
    for (var key in caseRegistry) {
        if (caseRegistry.hasOwnProperty(key)) {
            var options = caseRegistry[key];
            if (options.isCase(str)) {
                return options.fromCase(str);
            }
        }
    }
    throw new Error("StringWithUnknownCasing: " + str);
}
registerCase({
    caseName: 'Camel',
    isCase: function (v) { return camelCaseRegex.test(v); },
    fromCase: function (str) { return str.split(/(?=[A-Z])/).map(function (v) { return v.toLowerCase(); }); },
    toCase: function (words) { return [words[0]].concat(words.slice(1).map(function (w) { return w[0].toUpperCase() + w.substring(1); })).join(''); }
});
registerCase({
    caseName: 'Pascal',
    isCase: function (v) { return pascalCaseRegex.test(v); },
    fromCase: function (str) { return str.split(/(?=[A-Z])/).map(function (v) { return v.toLowerCase(); }); },
    toCase: function (words) { return words.map(function (w) { return w[0].toUpperCase() + w.substring(1); }).join(''); }
});
registerCase({
    caseName: 'Kebab',
    isCase: function (v) { return kebabCaseRegex.test(v); },
    fromCase: function (str) { return str.split('-'); },
    toCase: function (words) { return words.join('-'); }
});
registerCase({
    caseName: 'Snake',
    isCase: function (v) { return snakeCaseRegex.test(v); },
    fromCase: function (str) { return str.split('_'); },
    toCase: function (words) { return words.join('_'); }
});
registerCase({
    caseName: 'Macro',
    isCase: function (v) { return macroCaseRegex.test(v); },
    fromCase: function (str) { return str.split('_').map(function (v) { return v.toLowerCase(); }); },
    toCase: function (words) { return words.map(function (v) { return v.toUpperCase(); }).join('_'); }
});
var CasedWord = /** @class */ (function (_super) {
    __extends(CasedWord, _super);
    function CasedWord(word) {
        var _this = _super.call(this, word) || this;
        _this.words = fromCase(word);
        return _this;
    }
    CasedWord.prototype.toCase = function (casing) {
        var options = caseRegistry[casing];
        if (options) {
            return options.toCase(this.words);
        }
        else {
            throw new Error("UnknownCasing: " + casing);
        }
    };
    CasedWord.isCasedWord = I.isa(function (v) { return v instanceof CasedWord; }, 'CasedWord');
    return CasedWord;
}(scalar_1.Scalar));
exports.CasedWord = CasedWord;
exports.isCasedWord = CasedWord.isCasedWord;
exports.isCamelCaseString = S.isString.where(S.match(camelCaseRegex));
exports.isPascalCaseString = S.isString.where(S.match(pascalCaseRegex));
exports.isKebabCaseString = S.isString.where(S.match(kebabCaseRegex));
exports.isSnakeCaseString = S.isString.where(S.match(snakeCaseRegex));
exports.isMacroCaseString = S.isString.where(S.match(macroCaseRegex));
exports.isCasedWord.appendConvert(exports.isCamelCaseString
    .transform(function (v) { return new CasedWord(v); }));
exports.isCasedWord.appendConvert(exports.isPascalCaseString
    .transform(function (v) { return new CasedWord(v); }));
exports.isCasedWord.appendConvert(exports.isKebabCaseString
    .transform(function (v) { return new CasedWord(v); }));
exports.isCasedWord.appendConvert(exports.isSnakeCaseString
    .transform(function (v) { return new CasedWord(v); }));
exports.isCasedWord.appendConvert(exports.isMacroCaseString
    .transform(function (v) { return new CasedWord(v); }));
//# sourceMappingURL=cased-word.js.map