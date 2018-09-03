import { ValidationResult } from './base';
import { Constraint , ConstraintPredicate } from './constraint';

export type TransformProc<T, U> = (v : T) => U;

export type DefaultProc<T> = () => T;

export interface Validator<TInput, T> {
    assert(v : TInput, path ?: string) : T;
    validate(v : TInput, path ?: string) : ValidationResult<T>;
    where(constraint : Constraint<T> | ConstraintPredicate<T>) : Validator<TInput, T>;
    transform<U>(transform : Validator<T, U> | TransformProc<T, U>) : Validator<TInput, U>;
    intersect<U>(validator : Validator<TInput, U>) : Validator<TInput, T & U>;
    union<U>(validator : Validator<TInput, U>) : Validator<TInput, T | U>;
    isOptional() : Validator<TInput, T | undefined>;
    defaultTo(defaultProc : DefaultProc<T>) : Validator<TInput | undefined, T>;
    transformAsync<U>(validator : Validator<T, U> | AsyncValidator<T, U>) : AsyncValidator<TInput, U>;
    cast<U extends T>() : Validator<TInput, U>;
}

export abstract class BaseValidator<TInput, T> implements Validator<TInput, T> {
    assert(v : TInput, path ?: string) : T;
    abstract validate(v : TInput) : ValidationResult<T>;
    where(constraint : Constraint<T>) : Validator<TInput, T>;
    transform<U>(transform : Validator<T, U> | TransformProc<T, U>) : Validator<TInput, U>;
    intersect<U>(validator : Validator<TInput, U>) : Validator<TInput, T & U>;
    union<U>(validator : Validator<TInput, U>) : Validator<TInput, T | U>;
    then<U>(validator : Validator<T, U> | TransformProc<T, U>) : Validator<TInput, U>;
    isOptional() : Validator<TInput, T | undefined>;
    defaultTo(defaultProc : DefaultProc<T>) : Validator<TInput | undefined, T>; // the typing here is a bit wrong... default should only apply to TINput = any.
    toAsync() : AsyncValidator<TInput, T>; // this just convert the current validator to async...
    transformAsync<U>(validator : Validator<T, U> | AsyncValidator<T, U>) : AsyncValidator<TInput, U>;
    cast<U extends T>() : Validator<TInput, U>;
}

export let isAny : Validator<any, any>;

export type IsaPredicate<T> = (v : any) => v is T;

export function isa<T>(test : IsaPredicate<T>, typeName : string) : Validator<any, T>;

export function isLiteral<T extends string>(value : T) : Validator<any, T>;
export function isLiteral<T extends number>(value : T) : Validator<any, T>;
export function isLiteral<T extends boolean>(value : T) : Validator<any, T>;

export function isEnum<
    T1 extends string,
    T2 extends string,
    >
    (v1 : T1, v2 : T2) : Validator<any, T1 | T2>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3) : Validator<any, T1 | T2 | T3>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4) : Validator<any, T1 | T2 | T3 | T4>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5) : Validator<any, T1 | T2 | T3 | T4 | T5>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6) : Validator<any, T1 | T2 | T3 | T4 | T5 | T6>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7) : Validator<any, T1 | T2 | T3 | T4 | T5 | T6 | T7>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8) : Validator<any, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    T9 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8, v9 : T9) : 
        Validator<any, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    T8 extends string,
    T9 extends string,
    T10 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8, v9 : T9, v10: T10) : 
        Validator<any, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;

export let isUndefined : Validator<any, undefined>;

export let isNull : Validator<any, null>;

export type AsyncValidationResult<T> = Promise<T>;

export interface AsyncValidator<TInput, T> {
    validateAsync(v : TInput) : AsyncValidationResult<T>;
}

export type AsyncCall<TInput, T> = (value : TInput) => ValidationResult<T>;

export function byAsync<TInput, T>(asyncCall : AsyncCall<TInput, T>) : Validator<TInput, T>;

export function oneOf<TInput, T1>(v1 : Validator<TInput, T1>) : Validator<TInput, T1>;
export function oneOf<TInput, T1, T2>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    ) : Validator<TInput, T1 | T2>;
export function oneOf<TInput, T1, T2, T3>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    , v3: Validator<TInput, T3>
    ) : Validator<TInput, T1 | T2 | T3>;
export function oneOf<TInput, T1, T2, T3, T4>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    , v3: Validator<TInput, T3>
    , v4: Validator<TInput, T4>
    ) : Validator<TInput, T1 | T2 | T3 | T4>;
export function oneOf<TInput, T1, T2, T3, T4, T5>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    , v3: Validator<TInput, T3>
    , v4: Validator<TInput, T4>
    , v5: Validator<TInput, T5>
    ) : Validator<TInput, T1 | T2 | T3 | T4 | T5>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    , v3: Validator<TInput, T3>
    , v4: Validator<TInput, T4>
    , v5: Validator<TInput, T5>
    , v6: Validator<TInput, T6>
    ) : Validator<TInput, T1 | T2 | T3 | T4 | T5  | T6>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6, T7>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    , v3: Validator<TInput, T3>
    , v4: Validator<TInput, T4>
    , v5: Validator<TInput, T5>
    , v6: Validator<TInput, T6>
    , v7: Validator<TInput, T7>
    ) : Validator<TInput, T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    , v3: Validator<TInput, T3>
    , v4: Validator<TInput, T4>
    , v5: Validator<TInput, T5>
    , v6: Validator<TInput, T6>
    , v7: Validator<TInput, T7>
    , v8: Validator<TInput, T8>
    ) : Validator<TInput, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    , v3: Validator<TInput, T3>
    , v4: Validator<TInput, T4>
    , v5: Validator<TInput, T5>
    , v6: Validator<TInput, T6>
    , v7: Validator<TInput, T7>
    , v8: Validator<TInput, T8>
    , v9: Validator<TInput, T9>
    ) : Validator<TInput, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : Validator<TInput, T1>
    , v2: Validator<TInput, T2>
    , v3: Validator<TInput, T3>
    , v4: Validator<TInput, T4>
    , v5: Validator<TInput, T5>
    , v6: Validator<TInput, T6>
    , v7: Validator<TInput, T7>
    , v8: Validator<TInput, T8>
    , v9: Validator<TInput, T9>
    , v10: Validator<TInput, T10>
    ) : Validator<TInput, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

export function allOf<TInput, T1>
    (v1 : Validator<TInput, T1>)
    : Validator<TInput, T1>;
export function allOf<TInput, T1, T2>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    )
    : Validator<TInput, T1 & T2>;
export function allOf<TInput, T1, T2, T3>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    , v3 : Validator<TInput, T3>
    )
    : Validator<TInput, T1 & T2 & T3>;
export function allOf<TInput, T1, T2, T3, T4>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    , v3 : Validator<TInput, T3>
    , v4 : Validator<TInput, T4>
    )
    : Validator<TInput, T1 & T2 & T3 & T4>;
export function allOf<TInput, T1, T2, T3, T4, T5>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    , v3 : Validator<TInput, T3>
    , v4 : Validator<TInput, T4>
    , v5 : Validator<TInput, T5>
    )
    : Validator<TInput, T1 & T2 & T3 & T4 & T5>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    , v3 : Validator<TInput, T3>
    , v4 : Validator<TInput, T4>
    , v5 : Validator<TInput, T5>
    , v6 : Validator<TInput, T6>
    )
    : Validator<TInput, T1 & T2 & T3 & T4 & T5 & T6>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6, T7>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    , v3 : Validator<TInput, T3>
    , v4 : Validator<TInput, T4>
    , v5 : Validator<TInput, T5>
    , v6 : Validator<TInput, T6>
    , v7 : Validator<TInput, T7>
    )
    : Validator<TInput, T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    , v3 : Validator<TInput, T3>
    , v4 : Validator<TInput, T4>
    , v5 : Validator<TInput, T5>
    , v6 : Validator<TInput, T6>
    , v7 : Validator<TInput, T7>
    , v8 : Validator<TInput, T8>
    )
    : Validator<TInput, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    , v3 : Validator<TInput, T3>
    , v4 : Validator<TInput, T4>
    , v5 : Validator<TInput, T5>
    , v6 : Validator<TInput, T6>
    , v7 : Validator<TInput, T7>
    , v8 : Validator<TInput, T8>
    , v9 : Validator<TInput, T9>
    )
    : Validator<TInput, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : Validator<TInput, T1>
    , v2 : Validator<TInput, T2>
    , v3 : Validator<TInput, T3>
    , v4 : Validator<TInput, T4>
    , v5 : Validator<TInput, T5>
    , v6 : Validator<TInput, T6>
    , v7 : Validator<TInput, T7>
    , v8 : Validator<TInput, T8>
    , v9 : Validator<TInput, T9>
    , v10 : Validator<TInput, T10>
    )
    : Validator<TInput, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;
