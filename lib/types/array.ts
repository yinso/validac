import { ValidationResult , ValidationError, resolve, reject, ExplicitAny , ConvertValidator , ConvertValidatorCompat, IsaValidator, IsaValidatorCompat, ConvertOptions } from '../base';
import { BaseIsaValidator } from '../isa';
import { BaseConvertValidator } from '../convert'
import { isIsaValidator, isConvertValidator, isFunction } from '../_isa';

export class ArrayIsaValidator<T> extends BaseIsaValidator<T[]> {
    readonly inner : IsaValidatorCompat<T>;
    constructor(inner : IsaValidatorCompat<T>) {
        super();
        this.inner = inner;
    }

    get $type() { return { $array: (isFunction(this.inner) ? this.inner() : this.inner).$type } }

    validate(arg : ExplicitAny, path : string = '$') : ValidationResult<T[]> {
        if (!(arg instanceof Array)) {
            return reject([{
                error: 'TypeError',
                path: path,
                expected: 'Array',
                actual: arg
            }]);
        }
        let errors : ValidationError[] = [];
        arg.forEach((item, i) => {
            (isIsaValidator<T>(this.inner) ? this.inner : this.inner()).validate(item, path + '[' + i + ']')
                .cata(() => {}, (err) => {
                    errors = errors.concat(err.errors)
                })
        });
        if (errors.length > 0) {
            return reject(errors)
        } else {
            return resolve(arg)
        }
    }

    _toConvert(options : ConvertOptions) : ArrayConvertValidator<T> {
        return new ArrayConvertValidator((isIsaValidator(this.inner) ? this.inner : this.inner()).toConvert(options), options)
    }

}

export function matchArray(v : any) : v is any[] {
    return v instanceof Array
}

export function isArray<T>(item : IsaValidatorCompat<T>) : ArrayIsaValidator<T> {
    return new ArrayIsaValidator(item);
}

class ArrayConvertValidator<T> extends BaseConvertValidator<ExplicitAny, T[]> {
    readonly inner : ConvertValidatorCompat<ExplicitAny, T>;
    constructor(inner : ConvertValidatorCompat<ExplicitAny, T>, convertOptions : ConvertOptions) {
        super(convertOptions);
        this.inner = inner;
    }

    validate(arg : any, path : string = '$') : ValidationResult<T[]> {
        if (!(arg instanceof Array)) {
            return reject([{
                error: 'TypeError',
                path: path,
                expected: 'Array',
                actual: arg
            }]);
        }
        let result : T[] = [];
        let changed : boolean = false;
        let errors : ValidationError[] = [];
        arg.forEach((item, i) => {
            (isConvertValidator(this.inner) ? this.inner : this.inner()).validate(item, path + '[' + i + ']')
                .cata((value) => {
                    if (value !== item) {
                        changed = true
                    }
                    result[i] = value
                }, (err) => {
                    errors = errors.concat(err.errors)
                })
        });
        if (errors.length > 0) {
            return reject(errors)
        } else if (!changed) {
            return resolve(arg)
        } else {
            return resolve(result)
        }
    }
}
