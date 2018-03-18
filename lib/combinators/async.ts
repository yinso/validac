import { IValidator , IValidationResult } from '../base';

export class AsyncValidator<T, TInput = any> implements IValidator<T, TInput> {
    readonly asyncCall : (value : TInput) => Promise<T>;
    constructor(asyncCall : (value : TInput) => Promise<T>) {
        this.asyncCall = asyncCall;
    }
    validate(value : TInput) : IValidationResult<T> {
        return this.asyncCall(value);
    }
}

export function byAsync<T, TInput = any>(asyncCall : (value : TInput) => Promise<T>) {
    return new AsyncValidator(asyncCall);
}
