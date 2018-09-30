import { IsaValidator , BaseValidator, ExplicitAny, Constraint, ConstraintPredicate, ValidationResult, ConvertValidator, TransformProc, DefaultProc, Validator, IsaPredicate } from './base';
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

    toConvert(options ?: ExplicitAny) : ConvertValidator<ExplicitAny, T>;

    convert(value : ExplicitAny, path ?: string) : T;

    appendConvert(converter : ConvertValidator<ExplicitAny, T>) : void;

    protected abstract _toConvert(options ?: ExplicitAny) : ConvertValidator<ExplicitAny, T>;
}

export class TypeofIsaValidator<T> extends BaseIsaValidator<T> {
    readonly isaProc : IsaPredicate<T>;
    readonly typeName : string; 
    constructor(isa : IsaPredicate<T>, typeName : string);

    validate(value : any, path ?: string) : ValidationResult<T>;
    protected _toConvert(options ?: ExplicitAny): ConvertValidator<ExplicitAny, T>;
}

export function isa<T>(test : IsaPredicate<T>, typeName : string) : IsaValidator<T>;

export class ConstraintIsaValidator<T> extends BaseIsaValidator<T> {
    readonly validator : IsaValidator<T>;
    readonly constraint : Constraint<T>;
    constructor(validator : IsaValidator<T>, constraint : Constraint<T> | ConstraintPredicate<T>);
 
    validate(value : ExplicitAny, path ?: string) : ValidationResult<T>;
    protected _toConvert(options ?: ExplicitAny): ConvertValidator<ExplicitAny, T>;
}

export function isOneOf<T1>(v1 : IsaValidator<T1>) : IsaValidator<T1>;
export function isOneOf<T1, T2>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    )
: IsaValidator<T1 | T2>;
export function isOneOf<T1, T2, T3>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    )
: IsaValidator<T1 | T2 | T3>;
export function isOneOf<T1, T2, T3, T4>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    )
: IsaValidator<T1 | T2 | T3 | T4>;
export function isOneOf<T1, T2, T3, T4, T5>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5>;
export function isOneOf<T1, T2, T3, T4, T5, T6>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    , v7: IsaValidator<T7>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    , v7: IsaValidator<T7>
    , v8: IsaValidator<T8>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    , v7: IsaValidator<T7>
    , v8: IsaValidator<T8>
    , v9: IsaValidator<T9>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function isOneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : IsaValidator<T1>
    , v2: IsaValidator<T2>
    , v3: IsaValidator<T3>
    , v4: IsaValidator<T4>
    , v5: IsaValidator<T5>
    , v6: IsaValidator<T6>
    , v7: IsaValidator<T7>
    , v8: IsaValidator<T8>
    , v9: IsaValidator<T9>
    , v10: IsaValidator<T10>
    )
: IsaValidator<T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;

export function isAllOf<T1>
    (v1 : IsaValidator<T1>)
: IsaValidator<T1>;
export function isAllOf<T1, T2>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    )
: IsaValidator<T1 & T2>;
export function isAllOf<T1, T2, T3>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    )
: IsaValidator<T1 & T2 & T3>;
export function isAllOf<T1, T2, T3, T4>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    )
: IsaValidator<T1 & T2 & T3 & T4>;
export function isAllOf<T1, T2, T3, T4, T5>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5>;
export function isAllOf<T1, T2, T3, T4, T5, T6>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    , v7 : IsaValidator<T7>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    , v7 : IsaValidator<T7>
    , v8 : IsaValidator<T8>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    , v7 : IsaValidator<T7>
    , v8 : IsaValidator<T8>
    , v9 : IsaValidator<T9>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function isAllOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : IsaValidator<T1>
    , v2 : IsaValidator<T2>
    , v3 : IsaValidator<T3>
    , v4 : IsaValidator<T4>
    , v5 : IsaValidator<T5>
    , v6 : IsaValidator<T6>
    , v7 : IsaValidator<T7>
    , v8 : IsaValidator<T8>
    , v9 : IsaValidator<T9>
    , v10 : IsaValidator<T10>
    )
: IsaValidator<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;
