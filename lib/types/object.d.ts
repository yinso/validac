import { Constraint } from '../base';
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

export type ConvertValidatorKVMap<T> = {
    [P in keyof T]: ConvertValidator<T[P]>;
};

export interface ConvertObjectValidator<T> extends ConvertValidator<T> {
    extends<U>(validatorMap : ConvertValidatorKVMap<U>) : ConvertObjectValidator<T & U>;
    cast<U>() : ConvertObjectValidator<U>;
}

export function convertObject<T>(validatorMap : ConvertValidatorKVMap<T>) : ConvertObjectValidator<T>;
