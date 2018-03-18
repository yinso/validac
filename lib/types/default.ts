import { IValidator , IValidationResult } from '../base';

export class DefaultValidator<T, TInput = any> implements IValidator<T, TInput> {
    inner : IValidator<T, TInput>;
    defaultProc : () => T;
    constructor(inner : IValidator<T, TInput>, defaultProc : () => T) {
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

export function withDefault<T, TInput = any>(inner : IValidator<T, TInput>, defaultProc : () => T) {
    return new DefaultValidator(inner, defaultProc);
}

