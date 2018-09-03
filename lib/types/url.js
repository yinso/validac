"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var scalar_1 = require("../scalar");
var string_1 = require("./string");
var url = require("url");
exports.isUrl = string_1.isString
    .where(function (str) {
    try {
        var res = new url.URL(str);
        return true;
    }
    catch (e) {
        return false;
    }
});
var Url = /** @class */ (function (_super) {
    __extends(Url, _super);
    function Url(v) {
        var _this = _super.call(this, v) || this;
        _this._inner = new url.URL(v);
        return _this;
    }
    Object.defineProperty(Url.prototype, "hash", {
        get: function () {
            return this._inner.hash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "host", {
        get: function () {
            return this._inner.host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "hostname", {
        get: function () {
            return this._inner.hostname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "href", {
        get: function () {
            return this._inner.href;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "origin", {
        get: function () {
            return this._inner.origin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "password", {
        get: function () {
            return this._inner.password;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "pathname", {
        get: function () {
            return this._inner.pathname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "port", {
        get: function () {
            return this._inner.port;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "protocol", {
        get: function () {
            return this._inner.protocol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "search", {
        get: function () {
            return this._inner.search;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "searchParams", {
        get: function () {
            return this._inner.searchParams;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url.prototype, "username", {
        get: function () {
            return this._inner.username;
        },
        enumerable: true,
        configurable: true
    });
    Url.prototype.toJSON = function () {
        return this._inner.toJSON();
    };
    Url.prototype.toString = function () {
        return this._inner.toString();
    };
    Url.isUrl = function (v) {
        return v instanceof Url;
    };
    Url.fromJSON = function (v, path) {
        if (path === void 0) { path = '$'; }
        return Url.parseUrl.assert(v, path);
    };
    Url.parseUrl = exports.isUrl
        .transform(function (v) { return new Url(v); });
    return Url;
}(scalar_1.Scalar));
exports.Url = Url;
exports.parseUrl = Url.parseUrl;
//# sourceMappingURL=url.js.map