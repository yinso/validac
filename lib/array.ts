import { IValidator, IValidationResult , ValidationError } from './base';

class ArrayValidator<T, TInput = any> implements IValidator<T[], TInput> {
    validate(value : TInput, path : string = '$') : IValidationResult<T[]> {
        if (value instanceof Array) {
            return Promise.resolve(value as any as T[]);
        } else {
            return Promise.reject<T[]>([{
                error: 'TypeError',
                path: path,
                expected: 'array',
                actual: value
            }]);
        }
    }

    map<U>(itemValidator : IValidator<U, T>) : MapValidator<T, U> {
        return new MapValidator(itemValidator);        
    }
}

class MapValidator<T, U> implements IValidator<U[], T[]> {
    itemValidator : IValidator<U, T>;
    constructor(itemValidator : IValidator<U, T>) {
        this.itemValidator = itemValidator;
    }
    // what we need is the following th
    validate(value : T[], path : string = '$') : IValidationResult<U[]> {
        return new Promise<U[]>((resolve, reject) => {
            let results : U[] = [];
            let errors : ValidationError[] = [];
            Promise.all(value.map((item, i) => {
                return this.itemValidator.validate(item, `${path}[${i}]`)
                    .then((res) => {
                        results[i] = res;
                    })
                    .catch((errs) => {
                        errors = errors.concat(errs);
                    })
            }))
            .then((_) => {
                if (errors.length > 0) {
                    reject(errors);
                } else {
                    resolve(results);
                }
            })
        });
    }

    map<V>(itemValidator : IValidator<V, U>) :  MapValidator<U, V> {
        return new MapValidator<U, V>(itemValidator);
    }
}

export function isArray<U, TInput = any>(item : IValidator<U, TInput>) {
    return new ArrayValidator<TInput>().map(item);
}
