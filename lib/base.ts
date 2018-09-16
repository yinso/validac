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

export interface IsaValidator<T> extends Validator<ExplicitAny, T> {
    isa(v : ExplicitAny) : v is T;
    where(constraint : Constraint<T> | ConstraintPredicate<T>) : IsaValidator<T>;
    intersect<U>(validator : IsaValidator<U>) : IsaValidator<T & U>;
    union<U>(validator : IsaValidator<U>) : IsaValidator<T | U>;
    isOptional() : IsaValidator<T | undefined>;
    transform<U>(transform : TransformProc<T, U>) : ConvertValidator<ExplicitAny, U>;
    defaultTo(defaultProc : DefaultProc<T>) : IsaValidator<T>;
    toConvert() : ConvertValidator<ExplicitAny, T>;
    appendConvert(converter : ConvertValidator<ExplicitAny, T>) : void;
}

export function isIsaValidator<T>(v : any) : v is IsaValidator<T> {
    return isValidator(v) && isFunction((v as any).isa) && isFunction((v as any).where)
        && isFunction((v as any).intersect) && isFunction((v as any).union) && isFunction((v as any).isOptional)
        && isFunction((v as any).transform) && isFunction((v as any).defaultTo) && isFunction((v as any).toConvert);
}

export type IsaPredicate<T> = (v : any) => v is T;

export interface ValidationError {
    readonly error: string;
    readonly path : string;
    readonly expected: any;
    readonly actual: any;
}

export function isValidationError(arg : any) : arg is ValidationError {
    return !!arg && typeof(arg.error) === 'string' && typeof(arg.path) === 'string';
}

export function isValidationErrorArray(arg : any) : arg is ValidationError[] {
    return arg instanceof Array && arg.every(isValidationError);
}

export type SuccessDB<T, U> = (v : T, res : ValidationResult<T>) => U;
export type ErrorCB<T, U> = (errors : ValidationError[], res : ValidationResult<T>) => U;

export type SuccessPromiseCB<T, U> = (v: T) => U | Promise<U>;
export type ErrorPromiseCB<T, U> = (errors: ValidationError[]) => U | Promise<U>;
export type CreateResolveCB<T> = (v : T) => void;
export type CreateRejectCB<T> = (errors: ValidationError[]) => void;

export type ValidationCreateCallback<T> = (resolve : CreateResolveCB<T>, reject: CreateRejectCB<T>) => void;

export abstract class ValidationResult<T> {
    abstract cata<U>(onSuccess: SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U;

    toPromise() : Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.cata((res, _) => resolve(res),
                (errors, _) => reject(errors)); 
        })
    }

    then<U>(onSuccess: SuccessPromiseCB<T, U>, onError ?: ErrorPromiseCB<T, U>) : Promise<U> {
        return this.toPromise().then(onSuccess, onError);
    }

    static resolve<U>(value : U) {
        return new SuccessResult<U>(value);
    }

    static reject<U>(e : ValidationError | ValidationError[]) {
        if (e instanceof Array) {
            return new FailResult<U>(e);
        } else {
            return new FailResult<U>([e]);
        }
    }

    static allOf<U>(results : ValidationResult<U>[]) : ValidationResult<U[]> {
        // what is the outcome fo the 
        let result : U[] = [];
        let errors : ValidationError[] = [];
        results.forEach((res) => {
            res.cata(
                (value, _) => {
                    result.push(value)
                },
                (errs, _) => {
                    errors = errors.concat(errs)
                })
        });
        if (errors.length > 0) {
            return ValidationResult.reject(errors);
        } else {
            return ValidationResult.resolve(result);
        }
    }

    static oneOf<U>(results : ValidationResult<U>[]) : ValidationResult<U> {
        let isValid = false;
        let index = -1;
        let errors : ValidationError[] = [];
        results.forEach((res, i) => {
            res.cata(
                (r, _) => {
                    isValid = true,
                    index = i
                },
                (errs, _) => {
                    errors = errors.concat(errs)
                }
            )
        })
        if (isValid) {
            return results[index];
        } else {
            return ValidationResult.reject(errors);
        }
    }

    static filterErrors(results : ValidationResult<ExplicitAny>[]) : ValidationError[] {
        let errors : ValidationError[] = [];
        results.forEach((res, i) => {
            res.cata(
                (r, _) => {
                },
                (errs, _) => {
                    errors = errors.concat(errs)
                }
            )
        })
        return errors;
    }
}

class SuccessResult<T> extends ValidationResult<T> {
    readonly value : T;
    constructor(value : T) {
        super();
        this.value = value;
    }

    cata<U>(onSuccess: SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U {
        return onSuccess(this.value, this);
    }
}

class FailResult<T> extends ValidationResult<T> {
    readonly errors : ValidationError[];
    constructor(errors: ValidationError[]) {
        super();
        this.errors = errors;
    }

    cata<U>(onSuccess: SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U {
        if (!onError) {
            throw this;
        } else {
            return onError(this.errors, this);
        }
    }
}

export function isValidationResult<T>(item : any) : item is ValidationResult<T> {
    return !!item && item.hasOwnProperty('isValid'); 
}
