import { ValidationResult } from './base';
import { Constraint , ConstraintPredicate } from './constraint';

export type ExplicitAny = any

export type TransformProc<T, U> = (v : T) => U;

export type DefaultProc<T> = () => T;

export interface Validator<T> {
    isa(v : ExplicitAny) : v is T;
    assert(v : ExplicitAny, path ?: string) : T;
    validate(v : ExplicitAny, path ?: string) : ValidationResult<T>;
    where(constraint : Constraint<T> | ConstraintPredicate<T>) : Validator<T>;
    transform<U>(transform : Validator<U> | TransformProc<T, U>) : Validator<U>;
    intersect<U>(validator : Validator<U>) : Validator<T & U>;
    union<U>(validator : Validator<U>) : Validator<T | U>;
    isOptional() : Validator<T | undefined>;
    defaultTo(defaultProc : DefaultProc<T>) : Validator<T>;
    transformAsync<U>(validator : Validator<U> | AsyncValidator<U>) : AsyncValidator<U>;
    cast<U extends T>() : Validator<U>;
}

export abstract class BaseValidator<T> implements Validator<T> {
    isa(v : ExplicitAny) : v is T;
    assert(v : ExplicitAny, path ?: string) : T;
    abstract validate(v : ExplicitAny) : ValidationResult<T>;
    where(constraint : Constraint<T>) : Validator<T>;
    transform<U>(transform : Validator<U> | TransformProc<T, U>) : Validator<U>;
    intersect<U>(validator : Validator<U>) : Validator<T & U>;
    union<U>(validator : Validator<U>) : Validator<T | U>;
    then<U>(validator : Validator<U> | TransformProc<T, U>) : Validator<U>;
    isOptional() : Validator<T | undefined>;
    defaultTo(defaultProc : DefaultProc<T>) : Validator<T>; // the typing here is a bit wrong... default should only apply to TINput = any.
    toAsync() : AsyncValidator<T>; // this just convert the current validator to async...
    transformAsync<U>(validator : Validator<U> | AsyncValidator<U>) : AsyncValidator<U>;
    cast<U extends T>() : Validator<U>;
}

export let isAny : Validator<any>;

export type IsaPredicate<T> = (v : any) => v is T;

export function isa<T>(test : IsaPredicate<T>, typeName : string) : Validator<T>;

export function isLiteral<T extends string>(value : T) : Validator<T>;
export function isLiteral<T extends number>(value : T) : Validator<T>;
export function isLiteral<T extends boolean>(value : T) : Validator<T>;

export function isEnum<
    T1 extends string,
    T2 extends string,
    >
    (v1 : T1, v2 : T2) : Validator<T1 | T2>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3) : Validator<T1 | T2 | T3>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4) : Validator<T1 | T2 | T3 | T4>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5) : Validator<T1 | T2 | T3 | T4 | T5>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6) : Validator<T1 | T2 | T3 | T4 | T5 | T6>;
export function isEnum<
    T1 extends string,
    T2 extends string,
    T3 extends string,
    T4 extends string,
    T5 extends string,
    T6 extends string,
    T7 extends string,
    >
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7) : Validator<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
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
    (v1 : T1, v2 : T2, v3 : T3, v4 : T4, v5 : T5, v6 : T6, v7 : T7, v8 : T8) : Validator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
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
        Validator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
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
        Validator<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;

export let isUndefined : Validator<undefined>;

export let isNull : Validator<null>;

export type AsyncValidationResult<T> = Promise<T>;

export interface AsyncValidator<T> {
    validateAsync(v : ExplicitAny) : AsyncValidationResult<T>;
}

export type AsyncCall<TInput, T> = (value : TInput) => ValidationResult<T>;

export function byAsync<TInput, T>(asyncCall : AsyncCall<TInput, T>) : Validator<T>;

export function oneOf<TInput, T1>(v1 : Validator<T1>) : Validator<T1>;
export function oneOf<TInput, T1, T2>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    ) : Validator<T1 | T2>;
export function oneOf<TInput, T1, T2, T3>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    ) : Validator<T1 | T2 | T3>;
export function oneOf<TInput, T1, T2, T3, T4>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    ) : Validator<T1 | T2 | T3 | T4>;
export function oneOf<TInput, T1, T2, T3, T4, T5>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    ) : Validator<T1 | T2 | T3 | T4 | T5>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    ) : Validator<T1 | T2 | T3 | T4 | T5  | T6>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6, T7>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    , v7: Validator<T7>
    ) : Validator<T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    , v7: Validator<T7>
    , v8: Validator<T8>
    ) : Validator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    , v7: Validator<T7>
    , v8: Validator<T8>
    , v9: Validator<T9>
    ) : Validator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function oneOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : Validator<T1>
    , v2: Validator<T2>
    , v3: Validator<T3>
    , v4: Validator<T4>
    , v5: Validator<T5>
    , v6: Validator<T6>
    , v7: Validator<T7>
    , v8: Validator<T8>
    , v9: Validator<T9>
    , v10: Validator<T10>
    ) : Validator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

export function allOf<TInput, T1>
    (v1 : Validator<T1>)
    : Validator<T1>;
export function allOf<TInput, T1, T2>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    )
    : Validator<T1 & T2>;
export function allOf<TInput, T1, T2, T3>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    , v3 : Validator<T3>
    )
    : Validator<T1 & T2 & T3>;
export function allOf<TInput, T1, T2, T3, T4>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    , v3 : Validator<T3>
    , v4 : Validator<T4>
    )
    : Validator<T1 & T2 & T3 & T4>;
export function allOf<TInput, T1, T2, T3, T4, T5>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    , v3 : Validator<T3>
    , v4 : Validator<T4>
    , v5 : Validator<T5>
    )
    : Validator<T1 & T2 & T3 & T4 & T5>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    , v3 : Validator<T3>
    , v4 : Validator<T4>
    , v5 : Validator<T5>
    , v6 : Validator<T6>
    )
    : Validator<T1 & T2 & T3 & T4 & T5 & T6>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6, T7>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    , v3 : Validator<T3>
    , v4 : Validator<T4>
    , v5 : Validator<T5>
    , v6 : Validator<T6>
    , v7 : Validator<T7>
    )
    : Validator<T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    , v3 : Validator<T3>
    , v4 : Validator<T4>
    , v5 : Validator<T5>
    , v6 : Validator<T6>
    , v7 : Validator<T7>
    , v8 : Validator<T8>
    )
    : Validator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    , v3 : Validator<T3>
    , v4 : Validator<T4>
    , v5 : Validator<T5>
    , v6 : Validator<T6>
    , v7 : Validator<T7>
    , v8 : Validator<T8>
    , v9 : Validator<T9>
    )
    : Validator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function allOf<TInput, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : Validator<T1>
    , v2 : Validator<T2>
    , v3 : Validator<T3>
    , v4 : Validator<T4>
    , v5 : Validator<T5>
    , v6 : Validator<T6>
    , v7 : Validator<T7>
    , v8 : Validator<T8>
    , v9 : Validator<T9>
    , v10 : Validator<T10>
    )
    : Validator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;
