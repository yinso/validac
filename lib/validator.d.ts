import { IValidationResult } from './base';
import { Constraint } from './constraint';

export type Transform<T, U> = (v : T) => U;

export interface Validator<T, TInput = any> {
    validate(v : TInput) : IValidationResult<T>;
    where(constraint : Constraint<T>) : Validator<T, TInput>;
    to<U>(transform : Transform<T, U>) : Validator<U, TInput>;
    and<U>(validator : Validator<U, TInput>) : Validator<T & U, TInput>;
    or<U>(validator : Validator<U, TInput>) : Validator<T | U, TInput>;
    then<U>(validator : Validator<U, T>) : Validator<U, TInput>;
}

export abstract class BaseValidator<T, TInput = any> implements Validator<T, TInput> {
    abstract validate(v : TInput) : IValidationResult<T>;
    where(constraint : Constraint<T>) : Validator<T, TInput>;
    to<U>(transform : Transform<T, U>) : Validator<U, TInput>;
    and<U>(validator : Validator<U, TInput>) : Validator<T & U, TInput>;
    or<U>(validator : Validator<U, TInput>) : Validator<T | U, TInput>;
    then<U>(validator : Validator<U, T>) : Validator<U, TInput>;
}

export let isAny : Validator<any, any>;
