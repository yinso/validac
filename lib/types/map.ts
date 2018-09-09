import { ValidationResult , ValidationError } from '../base';
import { BaseIsaValidator, IsaValidator } from '../isa';

type _MapType<T> = Map<string, T>;

class MapValidator<T> extends BaseIsaValidator<_MapType<T>> {
    innerValidator : IsaValidator<T>;
    constructor(innerValidator : IsaValidator<T>) {
        super();
        this.innerValidator = innerValidator;
    }

    validate(arg : any, path : string = '$') : ValidationResult<_MapType<T>> {
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

export function isMap<T>(innerValidator : IsaValidator<T>) {
    return new MapValidator<T>(innerValidator);
}
