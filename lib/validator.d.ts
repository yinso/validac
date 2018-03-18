import { IValidationResult } from './base';
import { Constraint , ConstraintPredicate } from './constraint';

export type Transform<T, U> = (v : T) => U;

export interface Validator<T, TInput = any> {
    validate(v : TInput, path ?: string) : IValidationResult<T>;
    where(constraint : Constraint<T> | ConstraintPredicate<T>) : Validator<T, TInput>;
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

export type IsaPredicate<T> = (v : any) => v is T;

export function isa<T>(test : IsaPredicate<T>, typeName : string) : Validator<T, any>;

export function isLiteral<T extends string>(value : T) : Validator<T, any>;
export function isLiteral<T extends number>(value : T) : Validator<T, any>;
export function isLiteral<T extends boolean>(value : T) : Validator<T, any>;

export function isEnum<T1 extends string,
    T2 extends string,
    TInput = any>
    (v1 : T1, v2 : T2) : Validator<T1 | T2, TInput>;
export function isEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3) : Validator<T1 | T2 | T3, TInput>;
export function isEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4) : Validator<T1 | T2 | T3 | T4, TInput>;
export function isEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5) : Validator<T1 | T2 | T3 | T4 | T5, TInput>;
export function isEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6) : Validator<T1 | T2 | T3 | T4 | T5 | T6, TInput>;
export function isEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7) : Validator<T1 | T2 | T3 | T4 | T5 | T6 | T7, TInput>;
export function isEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8) : Validator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, TInput>;
export function isEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    T9 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8, v9 : T9) : 
        Validator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9, TInput>;
export function isEnum<T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    T9 extends string,
    T10 extends string,
    TInput = any>
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8, v9 : T9, v10: T10) : 
        Validator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10, TInput>;

export type AsyncCall<T, TInput = any> = (value : TInput) => IValidationResult<T>;

export function byAsync<T, TInput = any>(asyncCall : AsyncCall<T, TInput>) : Validator<T, TInput>;
