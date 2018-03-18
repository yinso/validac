import { IValidator, IValidationResult } from '../base';
import { isa } from './isa';
// this can be replaced with isa((v) ==> 'particular value')

export class LiteralValidator<T, U extends T, TInput = any> implements IValidator<U, TInput> {
    value : U;
    constructor(value : U) {
        this.value = value;
    }

    validate(value : TInput, path : string = '$') : IValidationResult<U> {
        if (value === (this.value as any as TInput))
            return Promise.resolve<U>(value as any as U);
        else
            return Promise.reject<U>([{
                error: 'InvalidLiteral',
                path: path,
                actual: value
            }]);
    }
}

///*
export function isLiteral<T, U extends T, TInput = any>(value : U) {
    return new LiteralValidator<T, U, TInput>(value);
}
//*/
