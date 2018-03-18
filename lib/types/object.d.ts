import { Validator } from '../validator';

export type ValidatorObject<T, TInput = any> = {
    [P in keyof T]: Validator<T[P], TInput>;
};

export function isObject<T>(validator : ValidatorObject<T>) : Validator<T>;


