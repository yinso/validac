import { IValidator, IValidationResult } from '../base';

export type TransformFunction<T, TInput = any> = (value : TInput) => T;

class TransformValidator<T, TInput = any> implements IValidator<T, TInput> {
    transform : TransformFunction<T, TInput>;
    constructor(transform : TransformFunction<T, TInput>) {
        this.transform = transform;
    }

    validate(value : TInput, path : string = '$') : IValidationResult<T> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.transform(value));
            } catch (e) {
                reject([{
                    error: 'TransformError',
                    path: path,
                    actual: value
                }]);
            }
        })
    }
}

export function transform<T, TInput = any>(trans : TransformFunction<T, TInput>) {
    return new TransformValidator(trans);
}
