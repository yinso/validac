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
var scalar_1 = require("../scalar");
var string_1 = require("./string");
var literal_1 = require("./literal");
var isa_1 = require("../isa");
// inspired by https://github.com/emilbayes/is-domain-name/blob/master/index.js
var _isDomainRegex = /^([a-z0-9]([-a-z0-9]*[a-z0-9])?\.)+([a-z]+)$/;
exports.isDomainNameString = isa_1.isOneOf(literal_1.isLiteral('localhost'), string_1.isString.where(string_1.match(_isDomainRegex)));
var DomainName = /** @class */ (function (_super) {
    __extends(DomainName, _super);
    function DomainName(inner) {
        return _super.call(this, inner) || this;
    }
    DomainName.isDomainName = function (v) {
        return v instanceof DomainName;
    };
    DomainName.convertDomainNameString = exports.isDomainNameString
        .transform(function (v) { return new DomainName(v); });
    return DomainName;
}(scalar_1.Scalar));
exports.DomainName = DomainName;
exports.isDomainName = isa_1.isa(DomainName.isDomainName, 'DomainName');
exports.isDomainName.appendConvert(DomainName.convertDomainNameString);
//# sourceMappingURL=domain-name.js.map