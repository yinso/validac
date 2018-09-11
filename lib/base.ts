export type ExplicitAny = any

export interface Validator<T> {
    assert(v : ExplicitAny, path ?: string) : T;
    validate(v : ExplicitAny, path ?: string) : ValidationResult<T>;
}

export abstract class BaseValidator<T> implements Validator<T> {
    abstract validate(value : ExplicitAny, path ?: string) : ValidationResult<T>;
    assert(value : ExplicitAny, path : string = '$') {
        return this.validate(value, path).cata((v) => v)
    }
}

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
