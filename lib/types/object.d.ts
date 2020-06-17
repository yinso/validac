import { ExplicitAny , Constraint, ConvertValidator , ConvertValidatorCompat, IsaValidator, ConvertOptions, IsaValidatorCompat } from '../base';

export type IsaValidatorKVMap<T extends object> = {
    [P in keyof T]: IsaValidatorCompat<T[P]>;
};

export type ObjectDiff<U, T> = Pick<U, Exclude<keyof U, keyof T>>;

export type ObjectIntersect<U, T> = Pick<U, Extract<keyof U, keyof T>>;

export interface ObjectIsaValidator<T extends object> extends IsaValidator<T> {
    readonly validatorMap: IsaValidatorKVMap<T>;
    extends<U extends T>(validatorMap : IsaValidatorKVMap<ObjectDiff<U, T>>) : ObjectIsaValidator<U>;
    toConvert(options ?: ConvertOptions) : ObjectConvertValidator<T>;
}

export function isObject<T extends object>(validatorMap : IsaValidatorKVMap<T>) : ObjectIsaValidator<T>;

// this is a very difficult thing to specify...!!! hmm...
export type ConvertValidatorKVMap<ExplicitAny, T> = {
    [P in keyof T]: ConvertValidatorCompat<ExplicitAny, T[P]>;
};

export interface ObjectConvertValidator<T extends object> extends ConvertValidator<ExplicitAny, T> {
    extends<U extends T>(validatorMap : ConvertValidatorKVMap<ExplicitAny, ObjectDiff<U, T>>) : ObjectConvertValidator<U>;
}

// think of something called objectFactory.

export interface IsObjectFactory<T extends object, KEY extends keyof T> extends ObjectIsaValidator<T> {
    readonly key : KEY;
}

export let isEmptyObject : ObjectIsaValidator<{}>;

export function isObjectMap<T>(inner : IsaValidatorCompat<T>) : IsaValidator<{[key: string]: T}>;
