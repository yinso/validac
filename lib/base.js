"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidationError(arg) {
    return !!arg && arg.error && arg.path;
}
exports.isValidationError = isValidationError;
function isValidationErrorArray(arg) {
    return arg instanceof Array && arg.every(isValidationError);
}
exports.isValidationErrorArray = isValidationErrorArray;
function isValidationResult(item) {
    return !!item && item.onSuccess;
}
exports.isValidationResult = isValidationResult;
function isValidator(item) {
    return !!item && typeof (item.validate) === 'function';
}
exports.isValidator = isValidator;
//# sourceMappingURL=base.js.map