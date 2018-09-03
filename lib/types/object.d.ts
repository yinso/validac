import { Validator } from '../validator';

export type ValidatorObject<T> = {
    [P in keyof T]: Validator<T[P]>;
};

export interface ObjectValidator<T> extends Validator<T> {
    extends<U>(validator : ValidatorObject<U>) : ObjectValidator<T & U>;
    cast<U>() : ObjectValidator<U>;
}

export function isObject<T>(validator : ValidatorObject<T>) : ObjectValidator<T>;
