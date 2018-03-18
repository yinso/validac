import { IValidationResult , ValidationError } from '../base';
import { Validator , BaseValidator } from '../validator';

type _MapType<T> = Map<string, T>;

class MapValidator<T, TInput = any> extends BaseValidator<_MapType<T>, TInput> {
    innerValidator : Validator<T, TInput>;
    constructor(innerValidator : Validator<T, TInput>) {
        super();
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
            let input : {[key: string]: any} = arg;
            return Promise.all(Object.keys(input).map((key) => {
                return this.innerValidator.validate(input[key] as any, `${path}.${key}`)
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

export function isMap<T, TInput = any>(innerValidator : Validator<T, TInput>) {
    return new MapValidator<T, TInput>(innerValidator);
}
