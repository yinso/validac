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
var uuid = require("uuid");
exports.isUuidString = string_1.isString
    .where(string_1.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
var Uuid = /** @class */ (function (_super) {
    __extends(Uuid, _super);
    function Uuid(inner) {
        return _super.call(this, exports.isUuidString.convert(inner || uuid.v4())) || this;
    }
    Uuid.isUuid = function (v) {
        return v instanceof Uuid;
    };
    Uuid.fromJSON = function (v, path) {
        if (path === void 0) { path = '$'; }
        return exports.isUuid.convert(v, path);
    };
    Uuid.convertUrlString = exports.isUuidString
        .transform(function (v) { return new Uuid(v); });
    return Uuid;
}(scalar_1.Scalar));
exports.Uuid = Uuid;
exports.isUuid = isa_1.isa(Uuid.isUuid, 'Uuid');
exports.isUuid.appendConvert(Uuid.convertUrlString);
//# sourceMappingURL=uuid.js.map