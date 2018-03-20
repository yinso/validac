import { ValidationResult , ValidationError } from '../base';
import { BaseValidator , Validator, isa } from '../validator';

class MapValidator<T, U> extends BaseValidator<U[], T[]> {
    itemValidator : Validator<U, T>;
    constructor(itemValidator : Validator<U, T>) {
        super();
        this.itemValidator = itemValidator;
    }
    // what we need is the following th
    validate(value : T[], path : string = '$') : ValidationResult<U[]> {
        let results = value.map((item, i) => this.itemValidator.validate(item, `${path}[${i}]`));
        // what do I do with the results? I want to flatten the results?
        return ValidationResult.allOf<U>(results);
    }

    map<V>(itemValidator : Validator<V, U>) :  MapValidator<U, V> {
        return new MapValidator<U, V>(itemValidator);
    }
}

export function isArray<U, TInput = any>(item : Validator<U, TInput>) {
    return isa((v : any) : v is any[] => v instanceof Array, 'array')
        .then(new MapValidator<TInput, U>(item));
}
