import { IValidator, IValidationResult } from './base';

export class OptionalValidator<T, TInput = any> implements IValidator<T | undefined, TInput> {
    inner : IValidator<T, TInput>;
    constructor(inner : IValidator<T, TInput>) {
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

export function isOptional<T, TInput = any>(inner : IValidator<T, TInput>) {
    return new OptionalValidator(inner);
}
