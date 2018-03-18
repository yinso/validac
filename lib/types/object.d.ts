import { IValidator } from '../base';

export type ValidatorObject<T, TInput = any> = {
    [P in keyof T]: IValidator<T[P], TInput>;
};

export function isObject<T>(validator : ValidatorObject<T>) : IValidator<T>;


