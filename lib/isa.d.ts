import { IsaValidator , IsaValidatorCompat, BaseValidator, ExplicitAny, Constraint, ConstraintPredicate, ValidationResult, ConvertValidator, TransformProc, DefaultProc, Validator, IsaPredicate, ConvertOptions } from './base';
import { ExecFileOptions } from 'child_process';

export abstract class BaseIsaValidator<T> extends BaseValidator<ExplicitAny, T> implements IsaValidator<T> {
    abstract validate(value : ExplicitAny, path ?: string) : ValidationResult<T>;

    isa(value : ExplicitAny, path ?: string) : value is T;

    where(constraint : Constraint<T> | ConstraintPredicate<T>) : IsaValidator<T>;

    intersect<U>(validator: IsaValidator<U>) : IsaValidator<T & U>;
    union<U>(validator : IsaValidator<U>) : IsaValidator<T | U>;

    transform<U>(transform : TransformProc<ExplicitAny, U>) : ConvertValidator<ExplicitAny, U>;

    isOptional() : IsaValidator<T | undefined>;

    defaultTo(defaultProc : DefaultProc<T>) : IsaValidator<T>;

    toConvert(options ?: ConvertOptions) : ConvertValidator<ExplicitAny, T>;

    convert(value : ExplicitAny, path ?: string) : T;

    appendConvert(converter : ConvertValidator<ExplicitAny, T>) : void;

    protected abstract _toConvert(options : ConvertOptions) : ConvertValidator<ExplicitAny, T>;
}

export class TypeofIsaValidator<T> extends BaseIsaValidator<T> {
    readonly isaProc : IsaPredicate<T>;
    readonly typeName : string; 
    constructor(isa : IsaPredicate<T>, typeName : string);

    validate(value : any, path ?: string) : ValidationResult<T>;
    protected _toConvert(options : ConvertOptions): ConvertValidator<ExplicitAny, T>;
}

export function isa<T>(test : IsaPredicate<T>, typeName : string) : IsaValidator<T>;

export function isIsaValidator<T>() : IsaValidator<IsaValidator<T>>;

export function isIsaValidatorCompat<T>() : IsaValidator<IsaValidatorCompat<T>>;

export class ConstraintIsaValidator<T> extends BaseIsaValidator<T> {
    readonly validator : IsaValidator<T>;
    readonly constraint : Constraint<T>;
    constructor(validator : IsaValidator<T>, constraint : Constraint<T> | ConstraintPredicate<T>);
 
    validate(value : ExplicitAny, path ?: string) : ValidationResult<T>;
    protected _toConvert(options : ConvertOptions): ConvertValidator<ExplicitAny, T>;
}

export function isOneOf<T1>(v1 : IsaValidatorCompat<T1>) : IsaValidator<T1>;
export function isOneOf<T1, T2>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    )
: IsaValidator<T1 | T2>;
export function isOneOf<T1, T2, T3>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    , v3: IsaValidatorCompat<T3>
    )
: IsaValidator<T1 | T2 | T3>;
export function isOneOf<T1, T2, T3, T4>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    , v3: IsaValidatorCompat<T3>
    , v4: IsaValidatorCompat<T4>
    )
: IsaValidator<T1 | T2 | T3 | T4>;
export function isOneOf<T1, T2, T3, T4, T5>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    , v3: IsaValidatorCompat<T3>
    , v4: IsaValidatorCompat<T4>
    , v5: IsaValidatorCompat<T5>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5>;
export function isOneOf<T1, T2, T3, T4, T5, T6>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    , v3: IsaValidatorCompat<T3>
    , v4: IsaValidatorCompat<T4>
    , v5: IsaValidatorCompat<T5>
    , v6: IsaValidatorCompat<T6>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    , v3: IsaValidatorCompat<T3>
    , v4: IsaValidatorCompat<T4>
    , v5: IsaValidatorCompat<T5>
    , v6: IsaValidatorCompat<T6>
    , v7: IsaValidatorCompat<T7>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    , v3: IsaValidatorCompat<T3>
    , v4: IsaValidatorCompat<T4>
    , v5: IsaValidatorCompat<T5>
    , v6: IsaValidatorCompat<T6>
    , v7: IsaValidatorCompat<T7>
    , v8: IsaValidatorCompat<T8>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    , v3: IsaValidatorCompat<T3>
    , v4: IsaValidatorCompat<T4>
    , v5: IsaValidatorCompat<T5>
    , v6: IsaValidatorCompat<T6>
    , v7: IsaValidatorCompat<T7>
    , v8: IsaValidatorCompat<T8>
    , v9: IsaValidatorCompat<T9>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : IsaValidatorCompat<T1>
    , v2: IsaValidatorCompat<T2>
    , v3: IsaValidatorCompat<T3>
    , v4: IsaValidatorCompat<T4>
    , v5: IsaValidatorCompat<T5>
    , v6: IsaValidatorCompat<T6>
    , v7: IsaValidatorCompat<T7>
    , v8: IsaValidatorCompat<T8>
    , v9: IsaValidatorCompat<T9>
    , v10: IsaValidatorCompat<T10>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

export function isAllOf<T1>
    (v1 : IsaValidatorCompat<T1>)
: IsaValidator<T1>;
export function isAllOf<T1, T2>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    )
: IsaValidator<T1 & T2>;
export function isAllOf<T1, T2, T3>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    , v3 : IsaValidatorCompat<T3>
    )
: IsaValidator<T1 & T2 & T3>;
export function isAllOf<T1, T2, T3, T4>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    , v3 : IsaValidatorCompat<T3>
    , v4 : IsaValidatorCompat<T4>
    )
: IsaValidator<T1 & T2 & T3 & T4>;
export function isAllOf<T1, T2, T3, T4, T5>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    , v3 : IsaValidatorCompat<T3>
    , v4 : IsaValidatorCompat<T4>
    , v5 : IsaValidatorCompat<T5>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5>;
export function isAllOf<T1, T2, T3, T4, T5, T6>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    , v3 : IsaValidatorCompat<T3>
    , v4 : IsaValidatorCompat<T4>
    , v5 : IsaValidatorCompat<T5>
    , v6 : IsaValidatorCompat<T6>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    , v3 : IsaValidatorCompat<T3>
    , v4 : IsaValidatorCompat<T4>
    , v5 : IsaValidatorCompat<T5>
    , v6 : IsaValidatorCompat<T6>
    , v7 : IsaValidatorCompat<T7>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    , v3 : IsaValidatorCompat<T3>
    , v4 : IsaValidatorCompat<T4>
    , v5 : IsaValidatorCompat<T5>
    , v6 : IsaValidatorCompat<T6>
    , v7 : IsaValidatorCompat<T7>
    , v8 : IsaValidatorCompat<T8>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    , v3 : IsaValidatorCompat<T3>
    , v4 : IsaValidatorCompat<T4>
    , v5 : IsaValidatorCompat<T5>
    , v6 : IsaValidatorCompat<T6>
    , v7 : IsaValidatorCompat<T7>
    , v8 : IsaValidatorCompat<T8>
    , v9 : IsaValidatorCompat<T9>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : IsaValidatorCompat<T1>
    , v2 : IsaValidatorCompat<T2>
    , v3 : IsaValidatorCompat<T3>
    , v4 : IsaValidatorCompat<T4>
    , v5 : IsaValidatorCompat<T5>
    , v6 : IsaValidatorCompat<T6>
    , v7 : IsaValidatorCompat<T7>
    , v8 : IsaValidatorCompat<T8>
    , v9 : IsaValidatorCompat<T9>
    , v10 : IsaValidatorCompat<T10>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;
