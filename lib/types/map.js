"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapValidator = /** @class */ (function () {
    function MapValidator(innerValidator) {
        this.innerValidator = innerValidator;
    }
    MapValidator.prototype.validate = function (arg, path) {
        var _this = this;
        if (path === void 0) { path = '$'; }
        if (!(arg instanceof Object)) {
            return Promise.reject([{
                    error: 'TypeError',
                    path: path,
                    expected: 'map',
                    actual: arg
                }]);
        }
        return new Promise(function (resolve, reject) {
            var errors = [];
            var result = new Map();
            var input = arg;
            return Promise.all(Object.keys(input).map(function (key) {
                return _this.innerValidator.validate(input[key], path + "." + key)
                    .then(function (res) {
                    result.set(key, res);
                })
                    .catch(function (errs) {
                    errors = errors.concat(errs);
                });
            }))
                .then(function (_) {
                if (errors.length > 0) {
                    reject(errors);
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    return MapValidator;
}());
function isMap(innerValidator) {
    return new MapValidator(innerValidator);
}
exports.isMap = isMap;
//# sourceMappingURL=map.js.map