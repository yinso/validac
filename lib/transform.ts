import * as B from './base';

export type TransformProc<T, U> = (v : T) => U;

export class TransformValidator<T, U> implements B.Validator<T, U> {
    readonly transformProc : TransformProc<T, U>;
    constructor(transformProc : TransformProc<T, U>) {
        this.transformProc = transformProc;
    }

    validate(value : T, path : string = '$') : B.ValidationResult<U> {
        try {
            let result = this.transformProc(value);
            return B.ValidationResult.resolve<U>(result);
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

export function transform<T, U>(transformProc : TransformProc<T, U>) : TransformValidator<T, U> {
    return new TransformValidator(transformProc);
}
