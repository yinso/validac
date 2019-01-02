/**
 * This file contains the base isa functions that are being used for internal
 * validation.
 * 
 * This is not meant to be exported by ./index.ts
 */
import { Validator, BaseValidator, Constraint, ConvertValidator, ConvertValidatorCompat, IsaValidator, IsaValidatorCompat, ValidationResult, ValidationErrorResult, SuccessResult } from './base';

export function isFunction(v : any) : v is Function {
    return typeof(v) === 'function';
}

export function isValidator<T, U>(v : any) : v is Validator<T, U> {
    return v instanceof BaseValidator || (!!v && isFunction(v.assert) && isFunction(v.validate));
}

export function isConstraint<T>(x : any) : x is Constraint<T> {
    return !!x
        && isFunction(x.satisfy)
        && isFunction(x.and)
        && isFunction(x.or)
        && isFunction(x.not)
}

export function isArrayOf<T>(isa : (v : any) => v is T) : (v : any) => v is T[] {
    return (v : any) : v is T[] => {
        return !!v && (v instanceof Array) && v.map(isa).filter((v) => v === false).length === 0;
    };
}

export function isConvertValidator<T, U>(v : any) : v is ConvertValidator<T, U> {
    return isValidator(v) && isFunction((v as any).where)
        && isFunction((v as any).intersect) && isFunction((v as any).union) && isFunction((v as any).isOptional)
        && isFunction((v as any).transform) && isFunction((v as any).defaultTo);
}

export function isConvertValidatorCompat<T, U>(v : any) : v is ConvertValidatorCompat<T, U> {
    return isConvertValidator<T, U>(v) || isFunction(v);
}

export function isIsaValidator<T>(v : any) : v is IsaValidator<T> {
    return isValidator(v) && isFunction((v as any).isa) && isFunction((v as any).where)
        && isFunction((v as any).intersect) && isFunction((v as any).union) && isFunction((v as any).isOptional)
        && isFunction((v as any).transform) && isFunction((v as any).defaultTo) && isFunction((v as any).toConvert);
}

export function isIsaValidatorCompat<T>(v : any) : v is IsaValidatorCompat<T> {
    return isIsaValidator<T>(v) || isFunction(v);
}
