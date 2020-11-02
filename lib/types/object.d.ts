import { ExplicitAny, ConvertValidatorCompat, IsaValidator, ConvertOptions, IsaValidatorCompat, ValidationResult } from '../base';
import { BaseIsaValidator } from '../isa';
import { BaseConvertValidator } from '../convert';
export declare type IsaValidatorKVMap<T extends object> = {
    [P in keyof T]: IsaValidatorCompat<T[P]>;
};
export declare type ObjectDiff<U, T> = Pick<U, Exclude<keyof U, keyof T>>;
export declare type ObjectIntersect<U, T> = Pick<U, Extract<keyof U, keyof T>>;
export declare class ObjectIsaValidator<T extends object> extends BaseIsaValidator<T> {
    readonly validatorMap: IsaValidatorKVMap<T>;
    constructor(validatorMap: IsaValidatorKVMap<T>);
    validate(value: any, path?: string): ValidationResult<T>;
    extends<U extends T>(validatorMap: IsaValidatorKVMap<ObjectDiff<U, T>>): ObjectIsaValidator<U>;
    toConvert(options?: ConvertOptions): ObjectConvertValidator<T>;
    _toConvert(options?: ConvertOptions): ObjectConvertValidator<T>;
}
export declare function isObject<T extends object>(validatorMap: IsaValidatorKVMap<T>): ObjectIsaValidator<T>;
export declare type ConvertValidatorKVMap<ExplicitAny, T> = {
    [P in keyof T]: ConvertValidatorCompat<ExplicitAny, T[P]>;
};
export declare class ObjectConvertValidator<T extends object> extends BaseConvertValidator<ExplicitAny, T> {
    readonly validatorMap: ConvertValidatorKVMap<ExplicitAny, T>;
    constructor(validatorMap: ConvertValidatorKVMap<ExplicitAny, T>, convertOptions?: ConvertOptions);
    validate(value: ExplicitAny, path?: string): ValidationResult<T>;
    private _getKey;
    extends<U extends T>(validatorMap: ConvertValidatorKVMap<ExplicitAny, ObjectDiff<U, T>>): ObjectConvertValidator<U>;
}
export interface IsObjectFactory<T extends object, KEY extends keyof T> extends ObjectIsaValidator<T> {
    readonly key: KEY;
}
export declare let isEmptyObject: IsaValidator<{}>;
declare class ObjectMapIsaValidator<T> extends BaseIsaValidator<{
    [key: string]: T;
}> {
    readonly inner: IsaValidatorCompat<T>;
    constructor(validator: IsaValidatorCompat<T>);
    validate(value: ExplicitAny, path?: string): ValidationResult<{
        [key: string]: T;
    }>;
    _toConvert(options: ConvertOptions): ObjectMapConvertValidator<T>;
}
declare class ObjectMapConvertValidator<T> extends BaseConvertValidator<ExplicitAny, {
    [key: string]: T;
}> {
    readonly inner: ConvertValidatorCompat<ExplicitAny, T>;
    constructor(inner: ConvertValidatorCompat<ExplicitAny, T>, convertOptions?: ConvertOptions);
    validate(value: ExplicitAny, path?: string): ValidationResult<{
        [key: string]: T;
    }>;
    _getKey(key: string): string;
}
export declare function isObjectMap<T>(inner: IsaValidatorCompat<T>): ObjectMapIsaValidator<T>;
export {};
