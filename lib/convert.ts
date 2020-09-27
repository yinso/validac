import { Validator, BaseValidator, ConvertValidator, ConvertValidatorCompat, Constraint, ValidationResult, ConstraintPredicate, TransformProc, DefaultProc, ExplicitAny, IsaPredicate, ConvertOptions, resolve, reject } from './base';
import { isConstraint, isConvertValidator } from './_isa';
import { pass } from './constraint';

export abstract class BaseConvertValidator<T, U> extends BaseValidator<T, U> implements ConvertValidator<T, U> {
    readonly convertOptions : ConvertOptions;

    constructor(convertOptions : ConvertOptions) {
        super();
        this.convertOptions = convertOptions;
    }

    abstract validate(value : T, path ?: string) : ValidationResult<U>;

    where(constraint : Constraint<U> | ConstraintPredicate<U>) : ConvertValidator<T, U> {
        return new ConstraintConvertValidator(this, constraint, this.convertOptions);
    }

    intersect<V>(validator: ConvertValidator<T, V>) : ConvertValidator<T, U & V> {
        return convertAllOf(this, validator);
    }

    union<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U | V> {
        return convertOneOf(this, validator);
    }

    transform<V>(transform : TransformProc<U, V>) : ConvertValidator<T, V> {
        return new TransformConvertValidator(this, transform, this.convertOptions);
    }

    isOptional() : ConvertValidator<T, U | undefined> {
        return new OptionalConvertValidator(this, this.convertOptions);
    }

    defaultTo(defaultProc : DefaultProc<U>) : ConvertValidator<T, U> {
        return new DefaultToConvertValidator(this, defaultProc, this.convertOptions);
    }
}

export class TypeofConvertValidator<T> extends BaseConvertValidator<ExplicitAny, T> {
    readonly isaProc : IsaPredicate<T>;
    readonly typeName : string;
    constructor(isa : IsaPredicate<T>, typeName : string, convertOptions: ConvertOptions) {
        super(convertOptions);
        this.isaProc = isa;
        this.typeName = typeName;
    }
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
}

export class TransformConvertValidator<T, U, V> extends BaseConvertValidator<T, V> {
    readonly validator : Validator<T, U>;
    readonly transformProc : TransformProc<U, V>;
    constructor(validator: Validator<T, U>, transformProc : TransformProc<U, V>, convertOptions: ConvertOptions) {
        super(convertOptions);
        this.validator = validator;
        this.transformProc = transformProc;
    }
    validate(value : T, path ?: string) : ValidationResult<V> {
        return this.validator.validate(value, path)
        .cata((result) => {
            //console.log('TransformValidator.result', result);
            let res = this.transformProc(result);
            //console.log('TransformValidator.validate', value, result, res, path)
            return resolve(res);
        }, (e) => (e as any) as ValidationResult<V>);
    }
}

export class ConstraintConvertValidator<T, U> extends BaseConvertValidator<T, U> {
    readonly validator : ConvertValidator<T, U>;
    readonly constraint : Constraint<U>;
    constructor(validator : ConvertValidator<T, U>, constraint : Constraint<U> | ConstraintPredicate<U>, convertOptions: ConvertOptions) {
        super(convertOptions);
        this.validator = validator;
        if (isConstraint(constraint)) {
            this.constraint = constraint;
        } else {
            this.constraint = pass(constraint);
        }
    }
    validate(value : T, path ?: string) : ValidationResult<U> {
        return this.validator.validate(value, path)
        .cata((v) => {
            //console.log('ConstraintConvertValidator.result')
            let errors = this.constraint.satisfy(v, path);
            if (errors.length > 0) {
                return reject(errors)
            } else {
                return resolve(v)
            }
        }, (e) => e)
    }
}

export class OptionalConvertValidator<T, U> extends BaseConvertValidator<T, U | undefined> {
    readonly validator: ConvertValidator<T, U>;
    constructor(validator : ConvertValidator<T, U>, convertOptions: ConvertOptions) {
        super(convertOptions);
        this.validator = validator;
    }
    validate(value : T, path ?: string) : ValidationResult<U | undefined> {
        if (value === undefined) {
            return resolve<U | undefined>(value as any);
        }
        return this.validator.validate(value, path);
    }
}

export class DefaultToConvertValidator<T, U> extends BaseConvertValidator<T, U> {
    readonly validator : ConvertValidator<T, U>;
    readonly defaultToProc : () => U;
    constructor(validator: ConvertValidator<T, U>, defaultToProc: () => U, convertOptions: ConvertOptions) {
        super(convertOptions);
        this.validator = validator;
        this.defaultToProc = defaultToProc;
    }
    validate(value: T, path ?: string) : ValidationResult<U> {
        if (value === undefined) {
            try {
                let defaultValue = this.defaultToProc();
                //return this.validator.validate(defaultValue, path);
                return resolve(defaultValue);
            } catch (e) {
                return reject(e)
            }
        } else {
            return this.validator.validate(value, path)
        }
    }
}

export function convertOneOf<T, T1>(v1 : ConvertValidatorCompat<T, T1>) : ConvertValidator<T, T1>;
export function convertOneOf<T, T1, T2>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    )
: ConvertValidator<T, T1 | T2>;
export function convertOneOf<T, T1, T2, T3>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    , v3: ConvertValidatorCompat<T, T3>
    )
: ConvertValidator<T, T1 | T2 | T3>;
export function convertOneOf<T, T1, T2, T3, T4>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    , v3: ConvertValidatorCompat<T, T3>
    , v4: ConvertValidatorCompat<T, T4>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4>;
export function convertOneOf<T, T1, T2, T3, T4, T5>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    , v3: ConvertValidatorCompat<T, T3>
    , v4: ConvertValidatorCompat<T, T4>
    , v5: ConvertValidatorCompat<T, T5>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    , v3: ConvertValidatorCompat<T, T3>
    , v4: ConvertValidatorCompat<T, T4>
    , v5: ConvertValidatorCompat<T, T5>
    , v6: ConvertValidatorCompat<T, T6>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    , v3: ConvertValidatorCompat<T, T3>
    , v4: ConvertValidatorCompat<T, T4>
    , v5: ConvertValidatorCompat<T, T5>
    , v6: ConvertValidatorCompat<T, T6>
    , v7: ConvertValidatorCompat<T, T7>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    , v3: ConvertValidatorCompat<T, T3>
    , v4: ConvertValidatorCompat<T, T4>
    , v5: ConvertValidatorCompat<T, T5>
    , v6: ConvertValidatorCompat<T, T6>
    , v7: ConvertValidatorCompat<T, T7>
    , v8: ConvertValidatorCompat<T, T8>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    , v3: ConvertValidatorCompat<T, T3>
    , v4: ConvertValidatorCompat<T, T4>
    , v5: ConvertValidatorCompat<T, T5>
    , v6: ConvertValidatorCompat<T, T6>
    , v7: ConvertValidatorCompat<T, T7>
    , v8: ConvertValidatorCompat<T, T8>
    , v9: ConvertValidatorCompat<T, T9>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9>;
export function convertOneOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2: ConvertValidatorCompat<T, T2>
    , v3: ConvertValidatorCompat<T, T3>
    , v4: ConvertValidatorCompat<T, T4>
    , v5: ConvertValidatorCompat<T, T5>
    , v6: ConvertValidatorCompat<T, T6>
    , v7: ConvertValidatorCompat<T, T7>
    , v8: ConvertValidatorCompat<T, T8>
    , v9: ConvertValidatorCompat<T, T9>
    , v10: ConvertValidatorCompat<T, T10>
    )
: ConvertValidator<T, T1 | T2 | T3 | T4 | T5  | T6 | T7 | T8 | T9 | T10>;
export function convertOneOf(...validators: ConvertValidatorCompat<ExplicitAny, ExplicitAny>[]) {
    return new UnionConvertValidator(validators, {});
}

export function _convertOneOf(validators: ConvertValidator<ExplicitAny, ExplicitAny>[], convertOptions: ConvertOptions = {}) {
    return new UnionConvertValidator(validators, convertOptions);
}

class UnionConvertValidator extends BaseConvertValidator<any, any> {
    readonly validators: ConvertValidatorCompat<any, any>[];
    constructor(validators: ConvertValidatorCompat<any, any>[], convertOptions: ConvertOptions) {
        super(convertOptions);
        this.validators = validators;
    }

    validate(value: any, path?: string): ValidationResult<any> {
        return this.validators.reduce((result: ValidationResult<any>, validator, i) => {
            return result.cata((v) => {
                // console.log(`******** UnionConvertValidator.validate`, value, i, v);
                return result;
            }, (e) => {
                // console.log(`******** UnionConvertValidator.validate:ERROR`, value, i, JSON.stringify(e));
                let _validator = isConvertValidator(validator) ? validator : validator();
                return _validator.validate(value, path);
            });
        }, reject({
            error: 'UnionIsaError',
            path: path || '$',
            expected: 'OneOfMatches',
            actual: value
        }))
    }
}


export function convertAllOf<T, T1>
    (v1 : ConvertValidatorCompat<T, T1>)
: ConvertValidator<T, T1>;
export function convertAllOf<T, T1, T2>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    )
: ConvertValidator<T, T1 & T2>;
export function convertAllOf<T, T1, T2, T3>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    , v3 : ConvertValidatorCompat<T, T3>
    )
: ConvertValidator<T, T1 & T2 & T3>;
export function convertAllOf<T, T1, T2, T3, T4>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    , v3 : ConvertValidatorCompat<T, T3>
    , v4 : ConvertValidatorCompat<T, T4>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4>;
export function convertAllOf<T, T1, T2, T3, T4, T5>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    , v3 : ConvertValidatorCompat<T, T3>
    , v4 : ConvertValidatorCompat<T, T4>
    , v5 : ConvertValidatorCompat<T, T5>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    , v3 : ConvertValidatorCompat<T, T3>
    , v4 : ConvertValidatorCompat<T, T4>
    , v5 : ConvertValidatorCompat<T, T5>
    , v6 : ConvertValidatorCompat<T, T6>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    , v3 : ConvertValidatorCompat<T, T3>
    , v4 : ConvertValidatorCompat<T, T4>
    , v5 : ConvertValidatorCompat<T, T5>
    , v6 : ConvertValidatorCompat<T, T6>
    , v7 : ConvertValidatorCompat<T, T7>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    , v3 : ConvertValidatorCompat<T, T3>
    , v4 : ConvertValidatorCompat<T, T4>
    , v5 : ConvertValidatorCompat<T, T5>
    , v6 : ConvertValidatorCompat<T, T6>
    , v7 : ConvertValidatorCompat<T, T7>
    , v8 : ConvertValidatorCompat<T, T8>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    , v3 : ConvertValidatorCompat<T, T3>
    , v4 : ConvertValidatorCompat<T, T4>
    , v5 : ConvertValidatorCompat<T, T5>
    , v6 : ConvertValidatorCompat<T, T6>
    , v7 : ConvertValidatorCompat<T, T7>
    , v8 : ConvertValidatorCompat<T, T8>
    , v9 : ConvertValidatorCompat<T, T9>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function convertAllOf<T, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
    (v1 : ConvertValidatorCompat<T, T1>
    , v2 : ConvertValidatorCompat<T, T2>
    , v3 : ConvertValidatorCompat<T, T3>
    , v4 : ConvertValidatorCompat<T, T4>
    , v5 : ConvertValidatorCompat<T, T5>
    , v6 : ConvertValidatorCompat<T, T6>
    , v7 : ConvertValidatorCompat<T, T7>
    , v8 : ConvertValidatorCompat<T, T8>
    , v9 : ConvertValidatorCompat<T, T9>
    , v10 : ConvertValidatorCompat<T, T10>
    )
: ConvertValidator<T, T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;
export function convertAllOf(...validators: ConvertValidatorCompat<any, any>[]) {
    return new IntersectConvertValidator(validators, {});
}

export function _convertAllOf(validators: ConvertValidatorCompat<ExplicitAny, ExplicitAny>[], convertOptions: ConvertOptions = {}) {
    return new IntersectConvertValidator(validators, convertOptions);
}

class IntersectConvertValidator extends BaseConvertValidator<any, any> {
    readonly validators: ConvertValidatorCompat<any, any>[];
    constructor(validators: ConvertValidatorCompat<any, any>[], convertOptions: ConvertOptions) {
        super(convertOptions);
        this.validators = validators;
    }

    validate(value: any, path?: string): ValidationResult<any> {
        return this.validators.reduce((result: ValidationResult<any>, validator) => {
            return result.cata((v) => {
                return (isConvertValidator(validator) ? validator : validator()).validate(v); 
            }, (e) => result);
        }, resolve(value));
    }
}
