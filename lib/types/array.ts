import { ValidationResult , ValidationError, ExplicitAny , ConvertValidator , ConvertValidatorCompat, isConvertValidator, IsaValidator, IsaValidatorCompat, ConvertOptions, isIsaValidator } from '../base';
import { BaseIsaValidator } from '../isa';
import { BaseConvertValidator } from '../convert'

export class ArrayIsaValidator<T> extends BaseIsaValidator<T[]> {
    readonly inner : IsaValidatorCompat<T>;
    constructor(inner : IsaValidatorCompat<T>) {
        super();
        this.inner = inner;
    }

    validate(arg : ExplicitAny, path : string = '$') : ValidationResult<T[]> {
        if (!(arg instanceof Array)) {
            return ValidationResult.reject([{
                error: 'TypeError',
                path: path,
                expected: 'Array',
                actual: arg
            }]);
        }
        let errors : ValidationError[] = [];
        arg.forEach((item, i) => {
            (isIsaValidator<T>(this.inner) ? this.inner : this.inner()).validate(item, path + '[' + i + ']')
                .cata(() => {}, (errs) => {
                    errors = errors.concat(errs)
                })
        });
        if (errors.length > 0) {
            return ValidationResult.reject(errors)
        } else {
            return ValidationResult.resolve(arg)
        }
    }

    _toConvert(options : ConvertOptions) : ArrayConvertValidator<T> {
        return new ArrayConvertValidator((isIsaValidator(this.inner) ? this.inner : this.inner()).toConvert(options), options)
    }

}

export function matchArray(v : any) : v is any[] {
    return v instanceof Array
}

export function isArray<T>(item : IsaValidator<T>) : ArrayIsaValidator<T> {
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
            return ValidationResult.reject([{
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
                }, (errs) => {
                    errors = errors.concat(errs)
                })
        });
        if (errors.length > 0) {
            return ValidationResult.reject(errors)
        } else if (!changed) {
            return ValidationResult.resolve(arg)
        } else {
            return ValidationResult.resolve(result)
        }
    }
}
