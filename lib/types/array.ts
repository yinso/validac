import { ValidationResult , ValidationError, ExplicitAny , ConvertValidator , IsaValidator } from '../base';
import { BaseIsaValidator } from '../isa';
import { BaseConvertValidator } from '../convert'

class IsArrayValidator<T> extends BaseIsaValidator<T[]> {
    readonly inner : IsaValidator<T>;
    constructor(inner : IsaValidator<T>) {
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
            this.inner.validate(item, path + '[' + i + ']')
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

    _toConvert() : ConvertArrayValidator<T> {
        return new ConvertArrayValidator(this.inner.toConvert())
    }

}

export function matchArray(v : any) : v is any[] {
    return v instanceof Array
}

export function isArray<T>(item : IsaValidator<T>) : IsaValidator<T[]> {
    return new IsArrayValidator(item);
}

class ConvertArrayValidator<T> extends BaseConvertValidator<ExplicitAny, T[]> {
    readonly inner : ConvertValidator<ExplicitAny, T>;
    constructor(inner : ConvertValidator<ExplicitAny, T>) {
        super();
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
            this.inner.validate(item, path + '[' + i + ']')
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

export function convertArray<T>(item : ConvertValidator<ExplicitAny, T>) : ConvertValidator<ExplicitAny, T[]> {
    return new ConvertArrayValidator(item);
}
