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
var base_1 = require("../base");
var isa_1 = require("../isa");
var convert_1 = require("../convert");
var object_1 = require("./object");
var string_1 = require("./string");
var literal_1 = require("./literal");
var TaggedObjectRegistry = /** @class */ (function () {
    function TaggedObjectRegistry(objectKey) {
        this.inner = {};
        this.objectKey = objectKey;
        this.subRegistries = [];
    }
    TaggedObjectRegistry.prototype.register = function (key, isObj) {
        this.inner[key] = isObj;
    };
    TaggedObjectRegistry.prototype.has = function (key) {
        if (this._innerHas(key)) {
            return true;
        }
        else {
            return this.subRegistries.find(function (reg) { return reg.has(key); }) !== undefined;
        }
    };
    TaggedObjectRegistry.prototype.get = function (key) {
        if (this._innerHas(key)) {
            return this.inner[key];
        }
        else {
            var result = this.subRegistries.find(function (reg) { return reg.has(key); });
            if (result) {
                return result.get(key);
            }
            else {
                throw new Error("Unindentified type: " + key);
            }
        }
    };
    TaggedObjectRegistry.prototype._innerHas = function (key) {
        return this.inner.hasOwnProperty(key);
    };
    TaggedObjectRegistry.prototype.makeSubRegistry = function () {
        var registry = new TaggedObjectRegistry(this.objectKey);
        this.subRegistries.push(registry);
        return registry;
    };
    return TaggedObjectRegistry;
}());
exports.TaggedObjectRegistry = TaggedObjectRegistry;
var TaggedObjectFactoryIsaValidator = /** @class */ (function (_super) {
    __extends(TaggedObjectFactoryIsaValidator, _super);
    function TaggedObjectFactoryIsaValidator(key, validatorMap, registry) {
        var _a;
        if (registry === void 0) { registry = new TaggedObjectRegistry(key); }
        var _this = _super.call(this) || this;
        _this.objectKey = key;
        _this.validatorMap = validatorMap;
        _this.inner = object_1.isObject(_extendsMap((_a = {},
            _a[_this.objectKey] = string_1.isString,
            _a), _this.validatorMap));
        _this.registry = registry;
        return _this;
    }
    TaggedObjectFactoryIsaValidator.prototype.register = function (key, map) {
        var _a;
        var isObj = object_1.isObject(_extendsMap((_a = {},
            _a[this.objectKey] = literal_1.isLiteral(key),
            _a), this.validatorMap)).extends(map);
        this.registry.register(key, isObj);
        return isObj;
    };
    TaggedObjectFactoryIsaValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        return this.inner.validate(value, path)
            .cata(function (v) {
            if (v.hasOwnProperty(_this.objectKey) && _this.registry.has(v[_this.objectKey])) {
                return _this.registry.get(v[_this.objectKey]).validate(v, path);
            }
            else {
                return base_1.ValidationResult.reject({
                    error: 'UnknownTag',
                    expected: 'A Registered Tag',
                    path: path,
                    actual: v[_this.objectKey]
                });
            }
        }, function (_, _res) { return _res; });
    };
    TaggedObjectFactoryIsaValidator.prototype.extends = function (validatorMap) {
        var extended = this._extendMap(validatorMap);
        var subClass = new TaggedObjectFactoryIsaValidator(this.objectKey, extended, this.registry.makeSubRegistry());
        return subClass;
    };
    TaggedObjectFactoryIsaValidator.prototype._extendMap = function (validatorMap) {
        var _this = this;
        var result = {};
        Object.keys(this.validatorMap).forEach(function (key) {
            result[key] = _this.validatorMap[key];
        });
        Object.keys(validatorMap).forEach(function (key) {
            result[key] = validatorMap[key];
        });
        return result;
    };
    TaggedObjectFactoryIsaValidator.prototype._toConvert = function (options) {
        var _a;
        return new TaggedObjectFactoryConvertValidator(this.objectKey, (_a = {}, _a[this.objectKey] = string_1.isString.toConvert(options), _a), this.inner.toConvert(options), this.registry, options);
    };
    return TaggedObjectFactoryIsaValidator;
}(isa_1.BaseIsaValidator));
function _extendsMap(obj, obj2) {
    var result = {};
    Object.keys(obj).forEach(function (key) {
        result[key] = obj[key];
    });
    Object.keys(obj2).forEach(function (key) {
        result[key] = obj2[key];
    });
    return result;
}
var TaggedObjectFactoryConvertValidator = /** @class */ (function (_super) {
    __extends(TaggedObjectFactoryConvertValidator, _super);
    function TaggedObjectFactoryConvertValidator(key, validatorMap, inner, registry, options) {
        var _this = _super.call(this) || this;
        _this.objectKey = key;
        _this.validatorMap = validatorMap;
        _this.inner = inner;
        _this.registry = registry;
        _this.convertOptions = options;
        return _this;
    }
    TaggedObjectFactoryConvertValidator.prototype.validate = function (value, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        return this.inner.validate(value, path)
            .cata(function (v) {
            if (v.hasOwnProperty(_this.objectKey) && _this.registry.has(v[_this.objectKey])) {
                return _this.registry.get(v[_this.objectKey]).toConvert(_this.convertOptions).validate(v, path);
            }
            else {
                return base_1.ValidationResult.reject({
                    error: 'UnknownTag',
                    expected: 'A Registered Tag',
                    path: path,
                    actual: v[_this.objectKey]
                });
            }
        }, function (_, _res) { return _res; });
    };
    return TaggedObjectFactoryConvertValidator;
}(convert_1.BaseConvertValidator));
function isTaggedObjectFactory(key, validatorMap) {
    return new TaggedObjectFactoryIsaValidator(key, validatorMap);
}
exports.isTaggedObjectFactory = isTaggedObjectFactory;
//# sourceMappingURL=tagged-object-factory.js.map