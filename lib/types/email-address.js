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
var isa_1 = require("../isa");
var E = require("email-addresses");
exports.isEmailAddressString = string_1.isString
    .where(function (v) { return !!E.parseOneAddress(v); });
function _isParsedMailbox(mailboxOrGroup) {
    return mailboxOrGroup.type === 'mailbox';
}
var EmailAddress = /** @class */ (function (_super) {
    __extends(EmailAddress, _super);
    function EmailAddress(inner) {
        var _this = _super.call(this, exports.isEmailAddressString.convert(inner)) || this;
        if (inner) {
            var parsed = E.parseOneAddress(inner);
            if (_isParsedMailbox(parsed)) {
                _this._parsed = parsed;
            }
            else {
                throw new Error("InvalidEmailAddress: " + inner);
            }
        }
        else {
            throw new Error("InvalidEmailAddress: " + inner);
        }
        return _this;
    }
    Object.defineProperty(EmailAddress.prototype, "name", {
        get: function () {
            return this._parsed.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailAddress.prototype, "address", {
        get: function () {
            return this._parsed.address;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailAddress.prototype, "localPart", {
        get: function () {
            return this._parsed.local;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailAddress.prototype, "domain", {
        get: function () {
            return this._parsed.domain;
        },
        enumerable: true,
        configurable: true
    });
    EmailAddress.isEmailAddress = function (v) {
        return v instanceof EmailAddress;
    };
    EmailAddress.fromJSON = function (v, path) {
        if (path === void 0) { path = '$'; }
        return exports.isEmailAddress.convert(v, path);
    };
    EmailAddress.convertEmailAddressString = exports.isEmailAddressString
        .transform(function (v) { return new EmailAddress(v); });
    return EmailAddress;
}(scalar_1.Scalar));
exports.isEmailAddress = isa_1.isa(EmailAddress.isEmailAddress, 'Email');
exports.isEmailAddress.appendConvert(EmailAddress.convertEmailAddressString);
//# sourceMappingURL=email-address.js.map