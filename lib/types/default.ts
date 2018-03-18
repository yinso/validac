import { IValidationResult } from '../base';
import { Validator, BaseValidator } from '../validator';

export class DefaultValidator<T, TInput = any> extends BaseValidator<T, TInput> {
    inner : Validator<T, TInput>;
    defaultProc : () => T;
    constructor(inner : Validator<T, TInput>, defaultProc : () => T) {
        super();
        this.inner = inner;
        this.defaultProc = defaultProc;
    }
    validate(value : TInput, path : string = '$') : IValidationResult<T> {
        if (value === undefined) {
            return Promise.resolve<T>(this.defaultProc());
        } else {
            return this.inner.validate(value, path);
        }
    }
}

export function withDefault<T, TInput = any>(inner : Validator<T, TInput>, defaultProc : () => T) {
    return new DefaultValidator(inner, defaultProc);
}

