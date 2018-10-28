export type ExplicitAny = any

export type Tagged<KEY extends string, T> = Record<KEY, T>;

export type Omit<T extends {[key: string]: ExplicitAny; }, KEY extends keyof T> = Pick<T, Exclude<keyof T, KEY>>;

export interface Validator<T, U> {
    assert(v : T, path ?: string) : U;
    validate(v : T, path ?: string) : ValidationResult<U>;
}

export function isValidator<T, U>(v : any) : v is Validator<T, U> {
    return !!v && typeof(v.assert) === 'function' && typeof(v.validate) === 'function';
}

export abstract class BaseValidator<T, U> implements Validator<T, U> {
    abstract validate(value : T, path ?: string) : ValidationResult<U>;
    assert(value : T, path : string = '$') : U {
        return this.validate(value, path).cata((v) => v)
    }
}

export type ConstraintPredicate<T> = (v : T) => boolean;

export interface Constraint<T> {
    satisfy(v : T, path : string) : ValidationError[];
    and(constraint : Constraint<T>) : Constraint<T>;
    or(constraint: Constraint<T>) : Constraint<T>;
    not() : Constraint<T>;
}

export function isConstraint<T>(x : any) : x is Constraint<T> {
    return !!x && typeof(x.satisfy) === 'function'
        && typeof(x.and) === 'function'
        && typeof(x.or) === 'function'
        && typeof(x.not) === 'function'
}

export type DefaultProc<T> = () => T;

export type TransformProc<T, U> = (v : T) => U;

export interface ConvertValidator<T, U> extends Validator<T, U> {
    where(constraint : Constraint<U> | ConstraintPredicate<U>) : ConvertValidator<T, U>;
    intersect<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U & V>;
    union<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U | V>;
    isOptional() : ConvertValidator<T, U | undefined>;
    transform<V>(transform : TransformProc<U, V>) : ConvertValidator<T, V>;
    defaultTo(defaultProc : DefaultProc<U>) : ConvertValidator<T, U>;
}

export type ConvertValidatorProc<T, U> = () => ConvertValidator<T, U>;

export type ConvertValidatorCompat<T, U> = ConvertValidator<T, U> | ConvertValidatorProc<T, U>;

function isFunction(v : any) : v is Function {
    return typeof(v) === 'function' || v instanceof Function;
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

export enum CaseNames {
    Camel = 'Camel',
    Pascal = 'Pascal',
    Kabab = 'Kabab',
    Snake = 'Snake',
    Macro = 'Macro',
}

export type CaseNameKeys = keyof typeof CaseNames;

export interface ConvertOptions {
    fromKeyCasing ?: CaseNameKeys;
}

export interface IsaValidator<T> extends Validator<ExplicitAny, T> {
    isa(v : ExplicitAny, path ?: string) : v is T;
    where(constraint : Constraint<T> | ConstraintPredicate<T>) : IsaValidator<T>;
    intersect<U>(validator : IsaValidator<U>) : IsaValidator<T & U>;
    union<U>(validator : IsaValidator<U>) : IsaValidator<T | U>;
    isOptional() : IsaValidator<T | undefined>;
    transform<U>(transform : TransformProc<T, U>) : ConvertValidator<ExplicitAny, U>;
    defaultTo(defaultProc : DefaultProc<T>) : IsaValidator<T>;
    toConvert(options ?: ConvertOptions) : ConvertValidator<ExplicitAny, T>;
    convert(v : ExplicitAny, path ?: string) : T;
    appendConvert(converter : ConvertValidator<ExplicitAny, T>) : void;
}

export function isIsaValidator<T>(v : any) : v is IsaValidator<T> {
    return isValidator(v) && isFunction((v as any).isa) && isFunction((v as any).where)
        && isFunction((v as any).intersect) && isFunction((v as any).union) && isFunction((v as any).isOptional)
        && isFunction((v as any).transform) && isFunction((v as any).defaultTo) && isFunction((v as any).toConvert);
}

export function isIsaValidatorCompat<T>(v : any) : v is IsaValidatorCompat<T> {
    return isIsaValidator<T>(v) || isFunction(v);
}

export type IsaValidatorProc<T> = () => IsaValidator<T>;

export type IsaValidatorCompat<T> = IsaValidator<T> | IsaValidatorProc<T>;

export type IsaPredicate<T> = (v : any) => v is T;

export interface ValidationError {
    readonly error: string;
    readonly path : string;
    readonly expected: any;
    readonly actual: any;
}

export type SuccessDB<T, U> = (v : T, res : ValidationResult<T>) => U;
export type ErrorCB<T, U> = (error : ValidationErrorResult<T>) => U;

export interface ValidationResult<T> {
    cata<U>(onSuccess : SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U;
}

export function resolve<U>(value : U) {
    return new SuccessResult<U>(value);
}

export function reject<U>(e : ValidationError | ValidationError[] | ValidationErrorResult<U>) {
    if (isValidationError<U>(e))
        return e;
    if (e instanceof Array) {
        return new ValidationErrorResult<U>(e);
    } else {
        return new ValidationErrorResult<U>([e]);
    }
}

export function allOf<U>(results : ValidationResult<U>[]) : ValidationResult<U[]> {
    // what is the outcome fo the 
    let result : U[] = [];
    let errors : ValidationError[] = [];
    results.forEach((res) => {
        res.cata((value) => {
            result.push(value)
        }, (err) => {
            errors = errors.concat(err.errors)
        })
    });
    if (errors.length > 0) {
        return reject(errors);
    } else {
        return resolve(result);
    }
}

export function oneOf<U>(results : ValidationResult<U>[]) : ValidationResult<U> {
    let isValid = false;
    let index = -1;
    let errors : ValidationError[] = [];
    results.forEach((res, i) => {
        res.cata((r) => {
            isValid = true,
            index = i
        }, (err) => {
            errors = errors.concat(err.errors)
        })
    })
    if (isValid) {
        return results[index];
    } else {
        return reject(errors);
    }
}

export function filterErrors(results : ValidationResult<ExplicitAny>[]) : ValidationError[] {
    let errors : ValidationError[] = [];
    results.forEach((res, i) => {
        res.cata((r) => {
            },(err) => {
                errors = errors.concat(err.errors)
            })
    })
    return errors;
}

class SuccessResult<T> implements ValidationResult<T> {
    readonly value : T;
    constructor(value : T) {
        this.value = value;
    }

    cata<U>(onSuccess: SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U {
        return onSuccess(this.value, this);
    }
}

export class ValidationErrorResult<T> extends Error implements ValidationResult<T> {
    readonly errors : ValidationError[];
    constructor(errors: ValidationError[]) {
        super();
        Object.setPrototypeOf(this, ValidationErrorResult.prototype);
        this.name = 'ValidationError';
        this.errors = errors;
    }

    cata<U>(onSuccess: SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U {
        if (!onError) {
            throw this;
        } else {
            return onError(this);
        }
    }

    toJSON() {
        return {
            error: this.name,
            errors: this.errors
        }
    }
}

(<any>Object).setPrototypeOf(ValidationErrorResult.prototype, Error.prototype); // this is the magic line that saves effort from extending objects.

export function isValidationResult<T>(item : any) : item is ValidationResult<T> {
    return !!item && typeof(item.cata) === 'function';
}

export function isValidationSuccess<T>(item : any) : item is SuccessResult<T> {
    return item instanceof SuccessResult;
}

export function isValidationError<T>(item : any) : item is ValidationErrorResult<T> {
    return item instanceof ValidationErrorResult;
}
