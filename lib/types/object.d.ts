import { Validator } from '../validator';

export type ValidatorObject<TInput, T> = {
    [P in keyof T]: Validator<TInput, T[P]>;
};

export interface ObjectValidator<TInput, T> extends Validator<TInput, T> {
    extends<U>(validator : ValidatorObject<TInput, U>) : ObjectValidator<TInput, T & U>;
    cast<U>() : ObjectValidator<TInput, U>;
}

export function isObject<TInput, T>(validator : ValidatorObject<TInput, T>) : ObjectValidator<TInput, T>;
