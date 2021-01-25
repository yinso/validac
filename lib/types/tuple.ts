import { IsaValidatorCompat, IsaValidator, reject, filterErrors, resolve, ConvertOptions, ConvertValidator, ExplicitAny, ValidationError, ValidationResult, isIsaValidatorProc, normalizeIsaValidator } from '../base';
import { BaseIsaValidator } from '../isa';
import { isFunction } from '../_isa'
import { BaseConvertValidator } from '../convert';


type MappedValidator<T extends object> = {
    [P in keyof T]: IsaValidatorCompat<T[P]>
}

type ValidatorTuple<T extends unknown[]> = MappedValidator<[...T]>

class TupleIsaValidator<T extends unknown[]> extends BaseIsaValidator<[...T]> {
    readonly validators: ValidatorTuple<T>
    constructor(validators: ValidatorTuple<T>) {
        super();
        this.validators = validators;
    }

    get $type() { return { $tuple: this.validators.map((v) => normalizeIsaValidator(v).$type) } }

    validate(tuple: unknown, path: string = '$'): ValidationResult<[...T]> {
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
                return normalizeIsaValidator(validator).validate(tuple[i], path + '[' + i + ']')
            }))
            if (errors.length > 0) {
                return reject(errors)
            } else {
                return resolve(tuple as [...T])
            }
        }
    }

    _toConvert(options: ConvertOptions) {
        return new ConvertTupleValidator<any, T>(this.validators.map((v) => normalizeIsaValidator(v).toConvert(options)), options)
    }
}

type MappedConvertValidator<T extends object, U extends object> = {
    [P in keyof T]: {
        [Q in keyof U]: ConvertValidator<T[P], U[Q]>
    }
}

type ConvertValidatorTuple<T extends unknown[], U extends unknown[]> = MappedConvertValidator<[...T], [...U]>

type test = ConvertValidatorTuple<[number, number, number], [string, string, string]>

class ConvertTupleValidator<T extends unknown[], U extends unknown[]> extends BaseConvertValidator<[...T], [...U]> {
    readonly validators: ConvertValidator<any, any>[]
    constructor(validators: ConvertValidator<any, any>[], convertOptions: ConvertOptions) {
        super(convertOptions);
        this.validators = validators;
    }

    validate(tuple: ExplicitAny, path = '$'): ValidationResult<[...U]> {
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
                return resolve(tuple as [...U])
            } else {
                return resolve(results as [...U])
            }
        }
    }
}

export function isTuple<T extends unknown[]>(...validators: ValidatorTuple<T>) {
    return new TupleIsaValidator(validators) as ExplicitAny
}
