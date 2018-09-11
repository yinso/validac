import { ExplicitAny } from '../base';
import { Constraint } from '../constraint';
import { IsaValidator } from '../isa';
import { ConvertValidator } from '../convert';

export type IsaValidatorKVMap<T> = {
    [P in keyof T]: IsaValidator<T[P]>;
};

export interface IsaObjectValidator<T> extends IsaValidator<T> {
    extends<U>(validatorMap : IsaValidatorKVMap<U>) : IsaObjectValidator<T & U>;
    cast<U>() : IsaObjectValidator<U>;
}

export function isObject<T>(validatorMap : IsaValidatorKVMap<T>) : IsaObjectValidator<T>;

// this is a very difficult thing to specify...!!! hmm...
export type ConvertValidatorKVMap<ExplicitAny, T> = {
    [P in keyof T]: ConvertValidator<ExplicitAny, T[P]>;
};

export interface ConvertObjectValidator<T> extends ConvertValidator<ExplicitAny, T> {
    extends<U>(validatorMap : ConvertValidatorKVMap<ExplicitAny, U>) : ConvertObjectValidator<T & U>;
    cast<U>() : ConvertObjectValidator<U>;
}

export function convertObject<T>(validatorMap : ConvertValidatorKVMap<ExplicitAny, T>) : ConvertObjectValidator<T>;
