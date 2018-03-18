"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsyncValidator = /** @class */ (function () {
    function AsyncValidator(asyncCall) {
        this.asyncCall = asyncCall;
    }
    AsyncValidator.prototype.validate = function (value) {
        return this.asyncCall(value);
    };
    return AsyncValidator;
}());
exports.AsyncValidator = AsyncValidator;
function byAsync(asyncCall) {
    return new AsyncValidator(asyncCall);
}
exports.byAsync = byAsync;
//# sourceMappingURL=async.js.map