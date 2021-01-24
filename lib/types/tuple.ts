import { IsaValidatorCompat, IsaValidator, reject, filterErrors, resolve, ConvertOptions, ConvertValidator, ExplicitAny, ValidationError, ValidationResult } from '../base';
import { BaseIsaValidator } from '../isa';
import { isFunction } from '../_isa'
import { BaseConvertValidator } from '../convert';

// const { resolve , reject , filterErrors } = require('../base');
// const { BaseIsaValidator } = require('../isa');
// const { BaseConvertValidator } = require('../convert');

class IsaTupleValidator extends BaseIsaValidator<any[]> {
    readonly validators: IsaValidatorCompat<any>[]
    constructor(validators: IsaValidatorCompat<any>[]) {
        super();
        this.validators = validators;
    }

    get $type() { return { $tuple: this.validators.map((v) => (isFunction(v) ? v() : v).$type) } }

    validate(tuple: unknown, path: string = '$'): ValidationResult<any[]> {
        if (!(tuple instanceof Array)) {
            return reject([{
                error: 'TypeError',
                path: path,
                expected: 'tuple',
                actual: tuple
            }]);
        }
        if (tuple.length !== this.validators.length) {
            return reject([{
                error: 'InvalidTupleSize',
                path: path,
                expected: this.validators.length,
                actual: tuple.length
            }])
        } else {
            let errors = filterErrors(this.validators.map((validator, i) => {
                return (typeof(validator) === 'function' ? validator() : validator).validate(tuple[i], path + '[' + i + ']')
            }))
            if (errors.length > 0) {
                return reject(errors)
            } else {
                return resolve(tuple)
            }
        }
    }

    _toConvert(options: ConvertOptions) {
        return new ConvertTupleValidator(this.validators.map((v) => (typeof(v) === 'function' ? v() : v).toConvert(options)), options)
    }
}


class ConvertTupleValidator extends BaseConvertValidator<any[], any[]> {
    readonly validators: ConvertValidator<any, any>[]
    constructor(validators: ConvertValidator<any, any>[], convertOptions: ConvertOptions) {
        super(convertOptions);
        this.validators = validators;
    }

    validate(tuple: ExplicitAny, path = '$'): ValidationResult<any[]> {
        if (!(tuple instanceof Array)) {
            return reject([{
                error: 'TypeError',
                path: path,
                expected: 'tuple',
                actual: tuple
            }]);
        }
        if (tuple.length !== this.validators.length) {
            return reject([{
                error: 'InvalidTupleSize',
                path: path,
                expected: this.validators.length,
                actual: tuple
            }])
        } else {
            let errors: ValidationError[] = [];
            let changed = false;
            let results: any[] = [];
            this.validators.forEach((validator, i) => {
                validator.validate(tuple[i], path + '[' + i + ']')
                    .cata((v) => {
                        if (v !== tuple[i]) {
                            changed = true
                        }
                        results[i] = v
                    }, (errs) => {
                        errors = errors.concat(errs.errors)
                    })
            });
            if (errors.length > 0) {
                return reject(errors)
            } else if (!changed) {
                return resolve(tuple)
            } else {
                return resolve(results)
            }
        }
    }
}


export function isTuple() : IsaValidator<[]>;
export function isTuple<T1>(
    v1 : IsaValidatorCompat<T1>,
) : IsaValidator<[T1]>;
export function isTuple<T1, T2>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>
) : IsaValidator<[T1, T2]>;
export function isTuple<T1, T2, T3>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>
) : IsaValidator<[T1, T2, T3]>;
export function isTuple<T1, T2, T3, T4>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
) : IsaValidator<[T1, T2, T3, T4]>;
export function isTuple<T1, T2, T3, T4, T5>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
) : IsaValidator<[T1, T2, T3, T4, T5]>;
export function isTuple<T1, T2, T3, T4, T5, T6>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
    v12 : IsaValidatorCompat<T12>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
    v12 : IsaValidatorCompat<T12>,
    v13 : IsaValidatorCompat<T13>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
    v12 : IsaValidatorCompat<T12>,
    v13 : IsaValidatorCompat<T13>,
    v14 : IsaValidatorCompat<T14>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14]>;
export function isTuple<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15>(
    v1 : IsaValidatorCompat<T1>,
    v2 : IsaValidatorCompat<T2>,
    v3 : IsaValidatorCompat<T3>,
    v4 : IsaValidatorCompat<T4>,
    v5 : IsaValidatorCompat<T5>,
    v6 : IsaValidatorCompat<T6>,
    v7 : IsaValidatorCompat<T7>,
    v8 : IsaValidatorCompat<T8>,
    v9 : IsaValidatorCompat<T9>,
    v10 : IsaValidatorCompat<T10>,
    v11 : IsaValidatorCompat<T11>,
    v12 : IsaValidatorCompat<T12>,
    v13 : IsaValidatorCompat<T13>,
    v14 : IsaValidatorCompat<T14>,
    v15 : IsaValidatorCompat<T15>,
) : IsaValidator<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15]>;
export function isTuple<T extends ExplicitAny>(...validators: IsaValidatorCompat<T>[]) {
    return new IsaTupleValidator(validators) as ExplicitAny
}
