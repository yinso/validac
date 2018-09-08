import { Validator , IsaValidator } from '../validator';
import { Constraint , ConstraintPredicate } from '../constraint';

export type ValidatorObject<T> = {
    [P in keyof T]: IsaValidator<T[P]>;
};

export interface ObjectValidator<T> extends IsaValidator<T> {
    extends<U>(validator : ValidatorObject<U>) : ObjectValidator<T & U>;
    cast<U>() : ObjectValidator<U>;
}

export function isObject<T>(validator : ValidatorObject<T>) : ObjectValidator<T>;
