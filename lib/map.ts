import { IValidator, IValidationResult , ValidationError } from './base';

type _MapType<T> = Map<string, T>;

class MapValidator<T, TInput = any> implements IValidator<_MapType<T>, TInput> {
    innerValidator : IValidator<T, TInput>;
    constructor(innerValidator : IValidator<T, TInput>) {
        this.innerValidator = innerValidator;
    }

    validate(arg : TInput, path : string = '$') : IValidationResult<_MapType<T>> {
        if (!(arg instanceof Object)) {
            return Promise.reject<_MapType<T>>([{
                error: 'TypeError',
                path: path,
                expected: 'map',
                actual: arg
            }])
        }
        return new Promise<_MapType<T>>((resolve, reject) => {
            let errors : ValidationError[] = [];
            let result = new Map<string, T>();
            return Promise.all(Object.keys(arg).map((key) => {
                return this.innerValidator.validate(arg[key], `${path}.${key}`)
                    .then((res) => {
                        result.set(key, res);
                    })
                    .catch((errs) => {
                        errors = errors.concat(errs)
                    })
            }))
            .then((_) => {
                if (errors.length > 0) {
                    reject(errors);
                } else {
                    resolve(result);
                }
            })
        })
    }
}

export function isMap<T, TInput = any>(innerValidator : IValidator<T, TInput>) {
    return new MapValidator<T, TInput>(innerValidator);
}
