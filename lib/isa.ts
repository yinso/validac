import { IsaValidator , IsaValidatorCompat, BaseValidator, ExplicitAny, Constraint, ConstraintPredicate, ValidationResult, ConvertValidator, TransformProc, DefaultProc, Validator, IsaPredicate, ConvertOptions, ConvertValidatorCompat, resolve, reject, TypeDef } from './base';
import { TransformConvertValidator, convertOneOf, TypeofConvertValidator, ConstraintConvertValidator, convertAllOf, _convertOneOf, _convertAllOf } from './convert';
import { isConvertValidator, isIsaValidator as _isIsaValidator, isIsaValidatorCompat as _isIsaValidatorCompat, isConstraint, isFunction } from './_isa';
import { pass } from './constraint';
import { OptionalConvertValidator, DefaultToConvertValidator } from './convert';

export abstract class BaseIsaValidator<T> extends BaseValidator<ExplicitAny, T> implements IsaValidator<T> {
    readonly converters: ConvertValidator<any, T>[];
    constructor() {
        super();
        this.converters = [];
    }

    abstract $type: TypeDef

    abstract validate(value : ExplicitAny, path ?: string) : ValidationResult<T>;

    isa(value : ExplicitAny, path ?: string) : value is T {
        return this.validate(value, path).cata(() => true, () => false);
    }

    where(constraint : Constraint<T> | ConstraintPredicate<T>) : IsaValidator<T> {
        return new ConstraintIsaValidator(this, constraint);
    }

    intersect<U>(validator: IsaValidator<U>) : IsaValidator<T & U> {
        return isAllOf(this, validator);
    }

    union<U>(validator : IsaValidator<U>) : IsaValidator<T | U> {
        return isOneOf(this, validator);
    }

    transform<U>(transform : TransformProc<ExplicitAny, U>) : ConvertValidator<ExplicitAny, U> {
        return new TransformConvertValidator(this, transform, {});
    }

    isOptional() : OptionalIsaValidator<T | undefined> {
        return new OptionalIsaValidator(this);
    }

    defaultTo(defaultProc : DefaultProc<T>) : IsaValidator<T> {
        return new DefaultToIsaValidator(this, defaultProc);
    }

    toConvert(options ?: ConvertOptions) : ConvertValidator<ExplicitAny, T> {
        if (this.converters.length > 0) {
            return _convertOneOf([this._toConvert(options || {})].concat(this.converters));
        } else {
            return this._toConvert(options || {});
        }
    }

    convert(value : ExplicitAny, path ?: string) : T {
        return this.toConvert().assert(value, path);
    }

    appendConvert(converter : ConvertValidator<ExplicitAny, T>) : void {
        if (!isConvertValidator(converter)) {
            throw new Error(`InvalidConvertValidator`);
        }
        this.converters.push(converter);
    }

    protected abstract _toConvert(options : ConvertOptions) : ConvertValidator<ExplicitAny, T>;
}

export class OptionalIsaValidator<T> extends BaseIsaValidator<T | undefined> {
    readonly validator: IsaValidator<T>;
    constructor(validator: IsaValidator<T>) {
        super();
        this.validator = validator;
    }

    get $type() { return { $optional: this.validator.$type } }

    validate(value: ExplicitAny, path?: string) {
        if (value === undefined) {
            return resolve(value);
        } else {
            return this.validator.validate(value, path);
        }
    }

    _toConvert(options: ConvertOptions) {
        return new OptionalConvertValidator(this.validator.toConvert(options), options);
    }
}

class DefaultToIsaValidator<T> extends BaseIsaValidator<T> {
    readonly validator: IsaValidator<T>;
    readonly defaultToProc: () => T;
    constructor(validator: IsaValidator<T>, defaultToProc: () => T) {
        super();
        this.validator = validator;
        this.defaultToProc = defaultToProc;
    }

    get $type() { return this.validator.$type }

    validate(value: ExplicitAny, path?: string) {
        return this.validator.validate(value, path);
    }

    _toConvert(options: ConvertOptions) {
        return new DefaultToConvertValidator(this.validator.toConvert(options), this.defaultToProc, options);
    }
}

export class TypeofIsaValidator<T> extends BaseIsaValidator<T> {
    readonly isaProc : IsaPredicate<T>;
    readonly typeName : string; 
    constructor(isa : IsaPredicate<T>, typeName : string) {
        super();
        this.isaProc = isa;
        this.typeName = typeName;
    }

    get $type() { return this.typeName }

    validate(value : any, path ?: string) : ValidationResult<T> {
        if (this.isaProc(value)) {
            return resolve(value);
        } else {
            return reject({
                error: 'TypeError',
                expected: this.typeName,
                path: path || '$',
                actual: value
            });
        }
    
    }
    protected _toConvert(options : ConvertOptions): ConvertValidator<ExplicitAny, T> {
        return new TypeofConvertValidator(this.isaProc, this.typeName, options);
    }
}

export function isa<T>(test : IsaPredicate<T>, typeName : string) : IsaValidator<T> {
    return new TypeofIsaValidator(test, typeName);
}

export type Constructor<T> = Function & { prototype : T };

export function isInstanceof<T>(obj : Constructor<T>, typeName : string) : IsaValidator<T> {
    return new TypeofIsaValidator((v): v is T => v instanceof Object, typeName);
}

export function isIsaValidator<T>() : IsaValidator<IsaValidator<T>> {
    return isa<IsaValidator<T>>(_isIsaValidator, 'IsaValidator');
}

export function isIsaValidatorCompat<T>() : IsaValidator<IsaValidatorCompat<T>> {
    return isa<IsaValidatorCompat<T>>(_isIsaValidatorCompat, 'IsaValidatorCompat');
}

export class ConstraintIsaValidator<T> extends BaseIsaValidator<T> {
    readonly validator : IsaValidator<T>;
    readonly constraint : Constraint<T>;
    constructor(validator : IsaValidator<T>, constraint : Constraint<T> | ConstraintPredicate<T>) {
        super();
        this.validator = validator;
        if (isConstraint(constraint)) {
            this.constraint = constraint;
        } else {
            this.constraint = pass(constraint);
        }
    }

    get $type() { return this.validator.$type } // might need to change this one.
 
    validate(value : ExplicitAny, path ?: string) : ValidationResult<T> {
        return this.validator.validate(value, path)
        .cata((v) => {
            let errors = this.constraint.satisfy(value, path);
            if (errors.length > 0) {
                return reject(errors)
            } else {
                return resolve(value)
            }
        }, (e) => e);
    }

    protected _toConvert(options : ConvertOptions): ConvertValidator<ExplicitAny, T> {
        return new ConstraintConvertValidator(this.validator.toConvert(options), this.constraint, options);
    }
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
export function isOneOf(...validators: IsaValidatorCompat<ExplicitAny>[]): IsaValidator<ExplicitAny> {
    return new UnionIsaValidator(validators);
}

class UnionIsaValidator extends BaseIsaValidator<ExplicitAny> {
    readonly validators: IsaValidatorCompat<ExplicitAny>[];
    constructor(validators: IsaValidatorCompat<ExplicitAny>[]) {
        super();
        this.validators = validators;
    }

    get $type() { return { $or: this.validators.map((v) => isFunction(v) ? v().$type : v.$type) } }

    validate(value: ExplicitAny, path?: string): ValidationResult<ExplicitAny> {
        return this.validators.reduce((result: ValidationResult<ExplicitAny>, validator, i) => {
            return result.cata((v) => {
                return result;
            }, (e) => (isFunction(validator) ? validator() : validator).validate(value, path));
        }, reject({
            error: 'UnionIsaError',
            path: path || '$',
            expected: 'OneOfMatches',
            actual: value
        }))
    }

    _toConvert(options: ConvertOptions) {
        return _convertOneOf(this.validators.map((v) => (isFunction(v) ? v() : v).toConvert(options)));
    }
}

export class ChoiceValidator<T> extends BaseIsaValidator<T> {
    readonly validators: IsaValidator<T>[];
    constructor(validators: IsaValidator<T>[]) {
        super();
        this.validators = validators;
    }

    get $type() { return { $or: this.validators.map((v) => v.$type ) } }

    push<T1 extends T>(validator: IsaValidator<T1>) : void {
        this.validators.push(validator);
    }
    unshift<T1 extends T>(validator: IsaValidator<T1>) : void {
        this.validators.unshift(validator);
    }
    validate(value : any, path ?: string) : ValidationResult<T> {
        return this.validators.reduce((result: ValidationResult<T>, validator, i) => {
            return result.cata((v) => {
                return result;
            }, (e) => validator.validate(value, path));
        }, reject<T>({
            error: 'UnionIsaError',
            path: path || '$',
            expected: 'OneOfMatches',
            actual: value
        }))
    }
    protected _toConvert(options : ConvertOptions): ConvertValidator<ExplicitAny, T> {
        return _convertOneOf(this.validators.map((v) => v.toConvert(options)), options);
    }
}

export function isChoice<T>() : ChoiceValidator<T> {
    return new ChoiceValidator([]);
}

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
export function isAllOf(...validators: IsaValidatorCompat<ExplicitAny>[]): IsaValidator<ExplicitAny> {
    return new IntersectIsaVallidator(validators);
}

class IntersectIsaVallidator extends BaseIsaValidator<ExplicitAny> {
    readonly validators: IsaValidator<ExplicitAny>[];
    constructor(validators: IsaValidatorCompat<ExplicitAny>[]) {
        super();
        this.validators = validators.map((v) => _isIsaValidator(v) ? v : v());
    }

    get $type() { return { $and: this.validators.map((v) => v.$type ) } }

    validate(value: ExplicitAny, path?:string): ValidationResult<ExplicitAny> {
        return this.validators.reduce((result: ValidationResult<ExplicitAny>, validator, i) => {
            return result.cata((v) => {
                return validator.validate(v, path);
            }, (e) => result);
        }, resolve(value))
    }

    intersect<U>(validator: IsaValidatorCompat<U>) {
        return new IntersectIsaVallidator(this.validators.concat(validator as IsaValidator<ExplicitAny>));
    }

    _toConvert(options: ConvertOptions) {
        return _convertAllOf(this.validators.map((step) => step.toConvert(options)))
    }
}
