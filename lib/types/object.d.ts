import { Constraint } from '../base';
import { IsaValidator } from '../isa';
import { ConvertValidator } from '../convert';

export type IsaValidatorKVMap<T> = {
    [P in keyof T]: IsaValidator<T[P]>;
};

export interface IsaObjectValidator<T> extends IsaValidator<T> {
    extends<U>(validator : IsaValidatorKVMap<U>) : IsaObjectValidator<T & U>;
    cast<U>() : IsaObjectValidator<U>;
}

export function isObject<T>(validator : IsaValidatorKVMap<T>) : IsaObjectValidator<T>;

export type ConvertValidatorKVMap<T> = {
    [P in keyof T]: ConvertValidator<T[P]>;
};

export interface ConvertObjectValidator<T> extends IsaValidator<T> {
    extends<U>(validator : ConvertValidatorKVMap<U>) : ConvertObjectValidator<T & U>;
    cast<U>() : ConvertObjectValidator<U>;
}

export function convertObject<T>(validator : ConvertValidatorKVMap<T>) : ConvertObjectValidator<T>;
