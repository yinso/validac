import * as B from './base';

export type TransformProc<T, U> = (v : T) => U;

export class TransformValidator<T> implements B.Validator<T> {
    readonly transformProc : TransformProc<B.ExplicitAny, T>;
    constructor(transformProc : TransformProc<B.ExplicitAny, T>) {
        this.transformProc = transformProc;
    }

    validate(value : B.ExplicitAny, path : string = '$') : B.ValidationResult<T> {
        try {
            let result = this.transformProc(value);
            return B.ValidationResult.resolve<T>(result);
        } catch (e) {
            return B.ValidationResult.reject(e);
        }
    }

    assert(value : B.ExplicitAny, path : string = '$') {
        return this.validate(value, path).cata((v) => {
            return v
        })
    }
}

export function transform<T>(transformProc : TransformProc<B.ExplicitAny, T>) : TransformValidator<T> {
    return new TransformValidator(transformProc);
}
