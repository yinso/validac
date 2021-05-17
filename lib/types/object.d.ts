import { ExplicitAny, ConvertValidatorCompat, IsaValidator, ConvertOptions, IsaValidatorCompat, ValidationResult, TypeDef, Omit2 } from '../base';
import { BaseIsaValidator } from '../isa';
import { BaseConvertValidator } from '../convert';
export declare type IsaValidatorKVMap<T extends object> = {
    [P in keyof T]: IsaValidatorCompat<T[P]>;
};
export declare type ObjectDiff<U, T> = Pick<U, Exclude<keyof U, keyof T>>;
export declare type ObjectIntersect<U, T> = Pick<U, Extract<keyof U, keyof T>>;
export interface ObjectIsaValidatorOptions {
    readonly rejectUndefinedParam?: boolean;
}
export interface ObjectFieldOptions<K extends string, T> {
    readonly key: K;
    readonly type: IsaValidatorCompat<T>;
}
export interface OptionalObjectFieldOptions<K extends string, T> extends ObjectFieldOptions<K, T> {
    readonly optional: true;
}
declare type _Normalize<T extends object> = T extends ObjectIsaValidator<infer U> ? ObjectIsaValidator<_Normalize<U>> : {
    [P in keyof T]: T[P];
};
declare type NormalObjectIsaValidator<T extends object> = _Normalize<ObjectIsaValidator<T>>;
export declare class ObjectIsaValidator<T extends object> extends BaseIsaValidator<T> {
    readonly validatorMap: IsaValidatorKVMap<T>;
    readonly rejectUndefinedParam: boolean;
    constructor(validatorMap: IsaValidatorKVMap<T>, options?: ObjectIsaValidatorOptions);
    get $type(): {
        $object: {
            [key: string]: TypeDef;
        };
    };
    validate(value: any, path?: string): ValidationResult<T>;
    extends<U extends T>(validatorMap: IsaValidatorKVMap<ObjectDiff<U, T>>): ObjectIsaValidator<U>;
    field<K extends string, U>(options: OptionalObjectFieldOptions<K, U>): NormalObjectIsaValidator<T & Partial<Record<K, U>>>;
    field<K extends string, U>(options: ObjectFieldOptions<K, U>): NormalObjectIsaValidator<T & Record<K, U>>;
    delete<K extends keyof T>(key: K): NormalObjectIsaValidator<Omit2<T, K>>;
    subset<K1 extends keyof T>(keys: [K1]): NormalObjectIsaValidator<Pick<T, K1>>;
    subset<K1 extends keyof T, K2 extends keyof T>(keys: [K1, K2]): NormalObjectIsaValidator<Pick<T, K1 | K2>>;
    subset<K1 extends keyof T, K2 extends keyof T, K3 extends keyof T>(keys: [K1, K2, K3]): NormalObjectIsaValidator<Pick<T, K1 | K2 | K3>>;
    subset<K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T>(keys: [K1, K2, K3, K4]): NormalObjectIsaValidator<Pick<T, K1 | K2 | K3 | K4>>;
    subset<K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T>(keys: [K1, K2, K3, K4, K5]): NormalObjectIsaValidator<Pick<T, K1 | K2 | K3 | K4 | K5>>;
    subset<K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T>(keys: [K1, K2, K3, K4, K5, K6]): NormalObjectIsaValidator<Pick<T, K1 | K2 | K3 | K4 | K5 | K6>>;
    subset<K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T, K7 extends keyof T>(keys: [K1, K2, K3, K4, K5, K6, K7]): NormalObjectIsaValidator<Pick<T, K1 | K2 | K3 | K4 | K5 | K6 | K7>>;
    subset<K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T, K7 extends keyof T, K8 extends keyof T>(keys: [K1, K2, K3, K4, K5, K6, K7, K8]): NormalObjectIsaValidator<Pick<T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8>>;
    subset<K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T, K7 extends keyof T, K8 extends keyof T, K9 extends keyof T>(keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9]): NormalObjectIsaValidator<Pick<T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9>>;
    subset<K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T, K7 extends keyof T, K8 extends keyof T, K9 extends keyof T, K10 extends keyof T>(keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]): NormalObjectIsaValidator<Pick<T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8 | K9 | K10>>;
    toConvert(options?: ConvertOptions): ObjectConvertValidator<T>;
    _toConvert(options?: ConvertOptions): ObjectConvertValidator<T>;
}
export declare function isObject<T extends object>(validatorMap: IsaValidatorKVMap<T>, options?: ObjectIsaValidatorOptions): ObjectIsaValidator<T>;
export declare type ConvertValidatorKVMap<ExplicitAny, T> = {
    [P in keyof T]: ConvertValidatorCompat<ExplicitAny, T[P]>;
};
export declare class ObjectConvertValidator<T extends object> extends BaseConvertValidator<ExplicitAny, T> {
    readonly validatorMap: ConvertValidatorKVMap<ExplicitAny, T>;
    readonly rejectUndefinedParameter: boolean;
    constructor(validatorMap: ConvertValidatorKVMap<ExplicitAny, T>, convertOptions?: ConvertOptions, objectOptions?: ObjectIsaValidatorOptions);
    validate(value: ExplicitAny, path?: string): ValidationResult<T>;
    private _getKey;
    extends<U extends T>(validatorMap: ConvertValidatorKVMap<ExplicitAny, ObjectDiff<U, T>>): ObjectConvertValidator<U>;
}
export interface IsObjectFactory<T extends object, KEY extends keyof T> extends ObjectIsaValidator<T> {
    readonly key: KEY;
}
export declare let isEmptyObject: IsaValidator<{}>;
export declare class ObjectMapIsaValidator<T> extends BaseIsaValidator<{
    [key: string]: T;
}> {
    readonly inner: IsaValidatorCompat<T>;
    constructor(validator: IsaValidatorCompat<T>);
    get $type(): {
        $objectMap: TypeDef;
    };
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
