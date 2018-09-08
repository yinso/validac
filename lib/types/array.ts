import { ValidationResult , ValidationError } from '../base';
import { BaseValidator , BaseIsaValidator, Validator, isa , IsaValidator, sequence , constraint, allOf , isOptional } from '../validator';
import { ConstraintPredicate, Constraint } from '../constraint';

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

class MapValidator<T> extends BaseValidator<T[]> {
    itemValidator : Validator<T>;
    constructor(itemValidator : Validator<T>) {
        super();
        this.itemValidator = itemValidator;
    }
    // what we need is the following th
    validate(value : any[], path : string = '$') : ValidationResult<T[]> {
        let results = value.map((item, i) => this.itemValidator.validate(item, `${path}[${i}]`));
        // what do I do with the results? I want to flatten the results?
        return ValidationResult.allOf<T>(results);
    }

    map<V>(itemValidator : Validator<V>) :  MapValidator<V> {
        return new MapValidator<V>(itemValidator);
    }
}

export function matchArray(v : any) : v is any[] {
    return v instanceof Array
}

export function isArray<T>(item : IsaValidator<T>) : IsaValidator<T[]> {
    return new IsArrayValidator(item);
}

/*
export function convertArray<T>(item : Validator<T>) {
    return isa(_isArray, 'array') // this doesn't hae a transform...
        .transform(new MapValidator<T>(item))
}

//*/
