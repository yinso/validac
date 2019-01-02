"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file contains the base isa functions that are being used for internal
 * validation.
 *
 * This is not meant to be exported by ./index.ts
 */
var base_1 = require("./base");
function isFunction(v) {
    return typeof (v) === 'function';
}
exports.isFunction = isFunction;
function isValidator(v) {
    return v instanceof base_1.BaseValidator || (!!v && isFunction(v.assert) && isFunction(v.validate));
}
exports.isValidator = isValidator;
function isConstraint(x) {
    return !!x
        && isFunction(x.satisfy)
        && isFunction(x.and)
        && isFunction(x.or)
        && isFunction(x.not);
}
exports.isConstraint = isConstraint;
function isArrayOf(isa) {
    return function (v) {
        return !!v && (v instanceof Array) && v.map(isa).filter(function (v) { return v === false; }).length === 0;
    };
}
exports.isArrayOf = isArrayOf;
function isConvertValidator(v) {
    return isValidator(v) && isFunction(v.where)
        && isFunction(v.intersect) && isFunction(v.union) && isFunction(v.isOptional)
        && isFunction(v.transform) && isFunction(v.defaultTo);
}
exports.isConvertValidator = isConvertValidator;
function isConvertValidatorCompat(v) {
    return isConvertValidator(v) || isFunction(v);
}
exports.isConvertValidatorCompat = isConvertValidatorCompat;
function isIsaValidator(v) {
    return isValidator(v) && isFunction(v.isa) && isFunction(v.where)
        && isFunction(v.intersect) && isFunction(v.union) && isFunction(v.isOptional)
        && isFunction(v.transform) && isFunction(v.defaultTo) && isFunction(v.toConvert);
}
exports.isIsaValidator = isIsaValidator;
function isIsaValidatorCompat(v) {
    return isIsaValidator(v) || isFunction(v);
}
exports.isIsaValidatorCompat = isIsaValidatorCompat;
//# sourceMappingURL=_isa.js.map