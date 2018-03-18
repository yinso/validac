import { IValidationResult } from '../base';
import { Validator, BaseValidator } from '../validator';

export class OptionalValidator<T, TInput = any> extends BaseValidator<T | undefined, TInput> {
    inner : Validator<T, TInput>;
    constructor(inner : Validator<T, TInput>) {
        super();
        this.inner = inner;
    }
    validate(value : TInput, path : string = '$') : IValidationResult<T | undefined> {
        if (value === undefined) {
            return Promise.resolve<T | undefined>(value);
        } else {
            return this.inner.validate(value, path);
        }
    }
}

export function isOptional<T, TInput = any>(inner : Validator<T, TInput>) {
    return new OptionalValidator(inner);
}
