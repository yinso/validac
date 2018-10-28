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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var scalar_1 = require("../scalar");
var string_1 = require("./string");
var url = require("url");
var isa_1 = require("../isa");
exports.isUrlString = string_1.isString
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
        _this._query = _this._parseSearch();
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
    Object.defineProperty(Url.prototype, "query", {
        get: function () {
            return this._query;
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
        return exports.isUrl.convert(v, path);
    };
    Url.format = function (options) {
        return url.format(__assign({}, options, { query: flatten(options.query || {}, '') }));
    };
    Url.prototype._parseSearch = function () {
        var query = {};
        this.searchParams.forEach(function (value, key) {
            query[key] = value;
        });
        return unflatten(query);
    };
    Url.convertUrlString = exports.isUrlString
        .transform(function (v) { return new Url(v); });
    return Url;
}(scalar_1.Scalar));
exports.Url = Url;
exports.isUrl = isa_1.isa(Url.isUrl, 'Url');
exports.isUrl.appendConvert(Url.convertUrlString);
// what is the interface that we are looking for?
// we want to be able to format
// do we want separation between QUERY and POST?
// I don't like them to be separated in general.
// let's just say that they are one and the same...??
// what we want is as follows.
// we need to convert the query and the
function unflatten(map) {
    var result = {};
    // we want to first sort key?
    Object.keys(map).sort().forEach(function (key) {
        processKey(result, key, map[key]);
        // create structure based on the keys.
        // assumption is that there aren't any conflicts...
        //
    });
    return result;
}
// below should be extracted out to its own library.
/*

v = {
    $.foo.bar: 1,
    $.foo.baz: 2
}

==>
{
    foo: {
        bar: 1
    }
}

== the split ==>
0, 1
[foo, bar]

when it's bar, we want to do current[bar] = 1
when it's foo, we want to do current[foo] = {}, current = current[foo]

*/
function processKey(result, key, value) {
    var segs = parseKey(key);
    var current = result;
    segs.forEach(function (seg, i) {
        if (i < segs.length - 1) {
            current[seg] = current.hasOwnProperty(seg) ? current[seg] : isInteger(segs[i + 1]) ? [] : {};
            current = current[seg];
        }
        else {
            current[seg] = value;
        }
    });
}
function parseKey(key) {
    // what can we do with the key? we need to first split up the key...
    var segs = key.split('.').map(function (seg) { return isIntString(seg) ? parseInt(seg) : seg; }); // the first seg needs to be $ but for now we'll ignore it.
    if (segs.length === 0) {
        return segs;
    }
    else if (segs[0] === '$') {
        segs.shift();
    }
    return segs;
}
function isInteger(seg) {
    return typeof (seg) === 'number';
}
function isIntString(seg) {
    return /^\d+$/.test(seg);
}
function flatten(arg, key) {
    if (key === void 0) { key = '$'; }
    var result = {};
    walk(result, arg, key);
    return result;
}
function walk(result, arg, key) {
    if (key === void 0) { key = '$'; }
    Object.keys(arg).forEach(function (objKey) {
        var value = arg[objKey];
        var fullKey = key === '' ? objKey : key + "." + objKey;
        if (value instanceof Array) {
            walk(result, value, fullKey);
        }
        else if (value instanceof Object) {
            walk(result, value, fullKey);
        }
        else {
            // this is the end...
            result[fullKey] = value;
        }
    });
}
// now that we have them, it's time to deal with forms.
// form specs are basically object specs.
//# sourceMappingURL=url.js.map