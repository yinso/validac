import { ValidationResult , ValidationError } from '../base';
import { BaseValidator , Validator, isa } from '../validator';

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

export function isArray<U>(item : Validator<U>) {
    return isa((v : any) : v is any[] => v instanceof Array, 'array')
        .transform(new MapValidator<U>(item));
}
