import { ExplicitAny, ValidationResult, resolve, reject, IsaValidator, Tagged, Omit, ConvertOptions } from '../base';
import { BaseIsaValidator } from '../isa';
import { BaseConvertValidator } from '../convert';
import { ObjectIsaValidator , IsaValidatorKVMap , isObject, ObjectDiff , ObjectConvertValidator, ConvertValidatorKVMap } from './object';
import { isString } from './string';
import { isLiteral } from './literal';

export class TaggedObjectRegistry<KEY extends string, T extends Tagged<KEY, string>> {
    readonly objectKey : KEY;
    readonly inner : {[key: string]: IsaValidator<T>}
    readonly subRegistries: TaggedObjectRegistry<KEY, T>[];
    constructor(objectKey : KEY) {
        this.inner = {};
        this.objectKey = objectKey;
        this.subRegistries = [];
    }

    register<U extends T>(key: string, isObj : IsaValidator<U>) {
        this.inner[key] = isObj;
    }

    has(key: string) : boolean {
        if (this._innerHas(key)) {
            return true;
        } else {
            return this.subRegistries.find((reg) => reg.has(key)) !== undefined;
        }
    }

    get(key: string) : IsaValidator<T> {
        if (this._innerHas(key)) {
            return this.inner[key];
        } else {
            let result = this.subRegistries.find((reg) => reg.has(key));
            if (result) {
                return result.get(key);
            } else {
                throw new Error(`Unindentified type: ${key}`)
            }
        }
    }

    private _innerHas(key: string): boolean {
        return this.inner.hasOwnProperty(key);
    }

    makeSubRegistry<U extends T>() {
        let registry = new TaggedObjectRegistry<KEY, U>(this.objectKey);
        this.subRegistries.push(registry)
        return registry;
    }
}

export class TaggedObjectFactoryIsaValidator<KEY extends string, T extends Tagged<KEY, string>> extends BaseIsaValidator<T> {
    readonly objectKey : KEY;
    readonly validatorMap : IsaValidatorKVMap<Omit<T, KEY>>;
    readonly inner : ObjectIsaValidator<T>;
    readonly registry : TaggedObjectRegistry<KEY, T>;
    constructor(key: KEY, validatorMap : IsaValidatorKVMap<Omit<T, KEY>>, registry : TaggedObjectRegistry<KEY, T> = new TaggedObjectRegistry(key)) { // how do I specify a subset of T?
        super();
        this.objectKey = key;
        this.validatorMap = validatorMap;
        this.inner = isObject(_extendsMap<Record<KEY, string>, Omit<T, KEY>, T>({
                [this.objectKey]: isString
            } as Record<KEY, IsaValidator<string>>,
            this.validatorMap));
        this.registry = registry;
    }

    register<K extends string, U extends T>(key: K, map : IsaValidatorKVMap<ObjectDiff<U, T>>) : ObjectIsaValidator<U> {
        let isObj = isObject<T>(_extendsMap<Record<KEY, string>, Omit<T, KEY>, T>({
                [this.objectKey]: isLiteral(key)
            } as Record<KEY, IsaValidator<K>>,
            this.validatorMap)).extends(map);
        this.registry.register(key, isObj);
        return isObj;
    }

    validate(value : ExplicitAny, path : string = '$') : ValidationResult<T> {
        return this.inner.validate(value, path)
            .cata((v) => {
                if (v.hasOwnProperty(this.objectKey) && this.registry.has(v[this.objectKey])) {
                    return this.registry.get(v[this.objectKey]).validate(v, path);
                } else {
                    return reject({
                        error: 'UnknownTag',
                        expected: 'A Registered Tag',
                        path,
                        actual: v[this.objectKey]
                    })
                }
            }, (err) => err)
    }

    extends<U extends T>(validatorMap : IsaValidatorKVMap<ObjectDiff<U, T>>) : TaggedObjectFactoryIsaValidator<KEY, U> {
        let extended = this._extendMap(validatorMap);
        let subClass = new TaggedObjectFactoryIsaValidator<KEY, U>(this.objectKey, extended, this.registry.makeSubRegistry());
        return subClass;
    }

    private _extendMap<U extends T>(validatorMap : IsaValidatorKVMap<ObjectDiff<U, T>>) : IsaValidatorKVMap<Omit<U, KEY>> {
        let result : {[key: string]: any} = {};
        Object.keys(this.validatorMap).forEach(key => {
            result[key] = (this.validatorMap as any)[key];
        });
        Object.keys(validatorMap).forEach(key => {
            result[key] = (validatorMap as any)[key];
        });
        return result as IsaValidatorKVMap<Omit<U, KEY>>;
    }

    _toConvert(options : ConvertOptions) : TaggedObjectFactoryConvertValidator<KEY, T> {
        return new TaggedObjectFactoryConvertValidator(this.objectKey,
            {[this.objectKey]: isString.toConvert(options) } as ConvertValidatorKVMap<ExplicitAny, T>,
            this.inner.toConvert(options),
            this.registry,
            options);
    }
}

export function _extendsMap<T extends {[key: string]: any}, U extends {[key: string]: any}, V extends T & U = T & U>(obj : IsaValidatorKVMap<T>, obj2 : IsaValidatorKVMap<U>) : IsaValidatorKVMap<V> {
    let result : {[key: string]: any} = {};
    Object.keys(obj).forEach(key => {
        result[key] = obj[key];
    });
    Object.keys(obj2).forEach(key => {
        result[key] = obj2[key];
    });
    return result as IsaValidatorKVMap<V>;
}

class TaggedObjectFactoryConvertValidator<KEY extends string, T extends Tagged<KEY, string>> extends BaseConvertValidator<ExplicitAny, T> {
    readonly objectKey : KEY;
    readonly validatorMap : ConvertValidatorKVMap<ExplicitAny, T>;
    readonly inner : ObjectConvertValidator<T>;
    readonly registry : TaggedObjectRegistry<KEY, T>;
    constructor(key: KEY, validatorMap : ConvertValidatorKVMap<ExplicitAny, T>, inner : ObjectConvertValidator<T>, registry : TaggedObjectRegistry<KEY, T>, options : ConvertOptions) {
        super(options);
        this.objectKey =key;
        this.validatorMap = validatorMap;
        this.inner = inner;
        this.registry = registry;
    }

    validate(value : ExplicitAny, path : string = '$') : ValidationResult<T> {
        return this.inner.validate(value, path)
            .cata((v) => {
                if (v.hasOwnProperty(this.objectKey) && this.registry.has(v[this.objectKey])) {
                    return this.registry.get(v[this.objectKey]).toConvert(this.convertOptions).validate(v, path);
                } else {
                    return reject({
                        error: 'UnknownTag',
                        expected: 'A Registered Tag',
                        path,
                        actual: v[this.objectKey]
                    })
                }
            }, (err) => err)
    }
}

export function isTaggedObjectFactory<KEY extends string, T extends Tagged<KEY, string>>(key : KEY, validatorMap: IsaValidatorKVMap<Omit<T, KEY>>) : TaggedObjectFactoryIsaValidator<KEY, T> {
    return new TaggedObjectFactoryIsaValidator(key, validatorMap);
}
