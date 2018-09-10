import { ValidationResult , ValidationError } from '../base';
import { BaseIsaValidator, IsaValidator } from '../isa';
import { BaseConvertValidator , ConvertValidator } from '../convert'

class IsArrayValidator<T> extends BaseIsaValidator<T[]> {
    readonly inner : IsaValidator<T>;
    constructor(inner : IsaValidator<T>) {
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

}

class MapValidator<T> extends BaseIsaValidator<T[]> {
    itemValidator : IsaValidator<T>;
    constructor(itemValidator : IsaValidator<T>) {
        super();
        this.itemValidator = itemValidator;
    }
    // what we need is the following th
    validate(value : any[], path : string = '$') : ValidationResult<T[]> {
        let results = value.map((item, i) => this.itemValidator.validate(item, `${path}[${i}]`));
        // what do I do with the results? I want to flatten the results?
        return ValidationResult.allOf<T>(results);
    }

    map<V>(itemValidator : IsaValidator<V>) :  MapValidator<V> {
        return new MapValidator<V>(itemValidator);
    }
}

export function matchArray(v : any) : v is any[] {
    return v instanceof Array
}

export function isArray<T>(item : IsaValidator<T>) : IsaValidator<T[]> {
    return new IsArrayValidator(item);
}

class ConvertArrayValidator<T> extends BaseConvertValidator<T[]> {
    readonly inner : ConvertValidator<T>;
    constructor(inner : ConvertValidator<T>) {
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

export function convertArray<T>(item : ConvertValidator<T>) : ConvertValidator<T[]> {
    return new ConvertArrayValidator(item);
}
