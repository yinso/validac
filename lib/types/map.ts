import { ValidationResult , ValidationError } from '../base';
import { Validator , BaseValidator } from '../validator';

type _MapType<T> = Map<string, T>;

class MapValidator<T, TInput = any> extends BaseValidator<_MapType<T>, TInput> {
    innerValidator : Validator<T, TInput>;
    constructor(innerValidator : Validator<T, TInput>) {
        super();
        this.innerValidator = innerValidator;
    }

    validate(arg : TInput, path : string = '$') : ValidationResult<_MapType<T>> {
        if (!(arg instanceof Object)) {
            return ValidationResult.reject([{
                error: 'TypeError',
                path: path,
                expected: 'map',
                actual: arg
            }])
        }
        let errors : ValidationError[] = [];
        let result = new Map<string, T>();
        let input : {[key: string]: any} = arg;
        Object.keys(input).map((key) => {
            this.innerValidator.validate(input[key] as any, `${path}.${key}`)
                .cata(
                    (res) => {
                        result.set(key, res);
                    },
                    (errs) => {
                        errors = errors.concat(errs)
                    }
                )
        });
        if (errors.length > 0) {
            return ValidationResult.reject(errors);
        } else {
            return ValidationResult.resolve(result);
        }
    }
}

export function isMap<T, TInput = any>(innerValidator : Validator<T, TInput>) {
    return new MapValidator<T, TInput>(innerValidator);
}
