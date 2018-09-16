import { Validator, BaseValidator, ConvertValidator, Constraint, ValidationResult, ConstraintPredicate, TransformProc, DefaultProc, ExplicitAny, IsaPredicate } from './base';

export abstract class BaseConvertValidator<T, U> extends BaseValidator<T, U> implements ConvertValidator<T, U> {
    abstract validate(value : T, path ?: string) : ValidationResult<U>;

    where(constraint : Constraint<U> | ConstraintPredicate<U>) : ConvertValidator<T, U>;

    intersect<V>(validator: ConvertValidator<T, V>) : ConvertValidator<T, U & V>;

    union<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U | V>;

    transform<V>(transform : TransformProc<U, V>) : ConvertValidator<T, V>;

    isOptional() : ConvertValidator<T, U | undefined>;

    defaultTo(defaultProc : DefaultProc<U>) : ConvertValidator<T, U>;
}

export class TypeofConvertValidator<T> extends BaseConvertValidator<ExplicitAny, T> {
    readonly isaProc : IsaPredicate<T>;
    readonly typeName : string;
    constructor(isa : IsaPredicate<T>, typeName : string);
    validate(value : any, path ?: string) : ValidationResult<T>;
}

export class TransformConvertValidator<T, U, V> extends BaseConvertValidator<T, V> {
    readonly validator : Validator<T, U>;
    readonly transformProc : TransformProc<U, V>;
    constructor(validator: Validator<T, U>, transformProc : TransformProc<U, V>);
    validate(value : T, path ?: string) : ValidationResult<V>;
}

export class ConstraintConvertValidator<T, U> extends BaseConvertValidator<T, U> {
    readonly validator : ConvertValidator<T, U>;
    readonly constraint : Constraint<U> | ConstraintPredicate<U>;
    constructor(validator : ConvertValidator<T, U>, constraint : Constraint<U> | ConstraintPredicate<U>);
    validate(value : T, path ?: string) : ValidationResult<U>;
}

export class OptionalConvertValidator<T, U> extends BaseConvertValidator<T, U | undefined> {
    readonly validator: ConvertValidator<T, U>;
    constructor(validator : ConvertValidator<T, U>);
    validate(value : T, path ?: string) : ValidationResult<U | undefined>;
}

export class DefaultToConvertValidator<T, U> extends BaseConvertValidator<T, U> {
    readonly validator : ConvertValidator<T, U>;
    readonly defaultToProc : () => U;
    constructor(validator: ConvertValidator<T, U>, defaultToProc: () => U);
    validate(value: T, path ?: string) : ValidationResult<U>;
}

export function convertOneOf<T, T1>(v1 : ConvertValidator<T, T1>) : ConvertValidator<T, T1>;
export function convertOneOf<T, T1, T2>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    )
: ConvertValidator<T, T1 | T2>;
export function convertOneOf<T, T1, T2, T3>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    )
: ConvertValidator<T, T1 | T2 | T3>;
export function convertOneOf<T, T1, T2, T3, T4>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4>;
export function convertOneOf<T, T1, T2, T3, T4, T5>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    , v7: ConvertValidator<T, T7>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    , v7: ConvertValidator<T, T7>
    , v8: ConvertValidator<T, T8>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    , v7: ConvertValidator<T, T7>
    , v8: ConvertValidator<T, T8>
    , v9: ConvertValidator<T, T9>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : ConvertValidator<T, T1>
    , v2: ConvertValidator<T, T2>
    , v3: ConvertValidator<T, T3>
    , v4: ConvertValidator<T, T4>
    , v5: ConvertValidator<T, T5>
    , v6: ConvertValidator<T, T6>
    , v7: ConvertValidator<T, T7>
    , v8: ConvertValidator<T, T8>
    , v9: ConvertValidator<T, T9>
    , v10: ConvertValidator<T, T10>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

export function convertAllOf<T, T1>
    (v1 : ConvertValidator<T, T1>)
: ConvertValidator<T, T1>;
export function convertAllOf<T, T1, T2>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    )
: ConvertValidator<T, T1 & T2>;
export function convertAllOf<T, T1, T2, T3>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    )
: ConvertValidator<T, T1 & T2 & T3>;
export function convertAllOf<T, T1, T2, T3, T4>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4>;
export function convertAllOf<T, T1, T2, T3, T4, T5>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    , v7 : ConvertValidator<T, T7>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    , v7 : ConvertValidator<T, T7>
    , v8 : ConvertValidator<T, T8>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    , v7 : ConvertValidator<T, T7>
    , v8 : ConvertValidator<T, T8>
    , v9 : ConvertValidator<T, T9>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : ConvertValidator<T, T1>
    , v2 : ConvertValidator<T, T2>
    , v3 : ConvertValidator<T, T3>
    , v4 : ConvertValidator<T, T4>
    , v5 : ConvertValidator<T, T5>
    , v6 : ConvertValidator<T, T6>
    , v7 : ConvertValidator<T, T7>
    , v8 : ConvertValidator<T, T8>
    , v9 : ConvertValidator<T, T9>
    , v10 : ConvertValidator<T, T10>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;
