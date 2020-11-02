import { ExplicitAny , Constraint, ConvertValidator , ConvertValidatorCompat, IsaValidator, ConvertOptions, IsaValidatorCompat, ValidationResult, reject, filterErrors, resolve } from '../base';
import { BaseIsaValidator } from '../isa';
import { BaseConvertValidator, OptionalConvertValidator } from '../convert';
import { CasedWord } from './cased-word';
import { isFunction } from '../_isa';

export type IsaValidatorKVMap<T extends object> = {
    [P in keyof T]: IsaValidatorCompat<T[P]>;
};

export type ObjectDiff<U, T> = Pick<U, Exclude<keyof U, keyof T>>;

export type ObjectIntersect<U, T> = Pick<U, Extract<keyof U, keyof T>>;

export class ObjectIsaValidator<T extends object> extends BaseIsaValidator<T> {
    readonly validatorMap: IsaValidatorKVMap<T>;
    constructor(validatorMap: IsaValidatorKVMap<T>) {
        super();
        this.validatorMap = validatorMap;
    }

    validate(value: any, path = '$'): ValidationResult<T> {
        if (!(value instanceof Object)) {
            return reject([{
                error: 'TypeError',
                path: path,
                expected: 'Object',
                actual: value
            }])
        }
        let errors = filterErrors(Object.keys(this.validatorMap).map((key) => {
            let validator: IsaValidatorCompat<T[keyof T]> = this.validatorMap[key as keyof T];
            return (typeof(validator) === 'function' ? validator() : validator).validate(value[key], path + '.' + key);
        }))
        if (errors.length > 0) {
            return reject(errors);
        } else { // isa validators don't change the values.
            return resolve(value);
        }
    }

    extends<U extends T>(validatorMap : IsaValidatorKVMap<ObjectDiff<U, T>>) : ObjectIsaValidator<U> {
        return new ObjectIsaValidator<U>(_extend(this.validatorMap, validatorMap) as IsaValidatorKVMap<U>)
    }

    toConvert(options ?: ConvertOptions) : ObjectConvertValidator<T> {
        return super.toConvert(options) as ObjectConvertValidator<T>;
    }

    _toConvert(options ?: ConvertOptions) : ObjectConvertValidator<T> {
        let convertMap: ConvertValidatorKVMap<ExplicitAny, T> = Object.keys(this.validatorMap).reduce((acc, key, i) => {
            let validator: IsaValidatorCompat<T[keyof T]> = this.validatorMap[key as keyof T];
            acc[key as keyof T] = (typeof(validator) === 'function' ? validator() : validator).toConvert(options);
            return acc
        }, {} as ConvertValidatorKVMap<ExplicitAny, T>);
        return new ObjectConvertValidator(convertMap, options)
    }
}

function _extend(...args: {[key: string]: any}[]) {
    let result: {[key: string]: any} = {}
    for (var i = 0; i < args.length; ++i) {
        let kv = args[i];
        for (var key in kv) {
            if (kv.hasOwnProperty(key)) {
                result[key] = kv[key]
            }
        }        
    }
    return result;
}


export function isObject<T extends object>(validatorMap : IsaValidatorKVMap<T>) : ObjectIsaValidator<T> {
    return new ObjectIsaValidator(validatorMap);
}

// this is a very difficult thing to specify...!!! hmm...
export type ConvertValidatorKVMap<ExplicitAny, T> = {
    [P in keyof T]: ConvertValidatorCompat<ExplicitAny, T[P]>;
};

export class ObjectConvertValidator<T extends object> extends BaseConvertValidator<ExplicitAny, T> {
    readonly validatorMap: ConvertValidatorKVMap<ExplicitAny, T>;
    constructor(validatorMap: ConvertValidatorKVMap<ExplicitAny, T>, convertOptions: ConvertOptions = {}) {
        super(convertOptions);
        this.validatorMap = validatorMap;
    }

    validate(value: ExplicitAny, path: string = '$'): ValidationResult<T> {
        if (!(value instanceof Object)) {
            return reject([{
                error: 'TypeError',
                path: path,
                expected: 'Object',
                actual: value
            }])
        }
        let errors: ExplicitAny[] = [];
        const keyMap: {[key: string]: string }= {};
        let changed = false;
        let results = Object.keys(this.validatorMap).reduce((acc, key) => {
            let validator: ConvertValidatorCompat<ExplicitAny, T[keyof T]> = this.validatorMap[key as keyof T];
            let objectKey = this._getKey(key);
            keyMap[objectKey] = key;
            let propValue = value[objectKey];
            const _validator = isFunction(validator) ? validator() : validator
            let result = _validator.validate(propValue, path + '.' + key)
            return result.cata((v) => {
                if (v !== propValue) {
                    changed = true
                }
                if (v === undefined && _validator instanceof OptionalConvertValidator) {
                    // do nothing, because it's an optional property.
                } else {
                    acc[key] = v;
                }
                // console.log(`******** ObjectValidator.validate`, key, propValue, v, changed, validator.toString());
                return acc
            }, (e) => {
                errors = errors.concat(e.errors);
                // console.log(`******** ObjectValidator.validate:ERROR`, key, e.name, acc);
                return acc;
            })
        }, {} as {[key: string]: any});
        // console.log(`******** ObjectValidator.validate`, value, results, keyMap);
        if (errors.length > 0) {
            return reject(errors);
        } else if (!changed) {
            return resolve(value);
        } else {
            Object.keys(value).forEach((key) => {
                if (!results.hasOwnProperty(keyMap[key])) {
                    results[key] = value[key];
                }
            })
            return resolve(results as T)
        }
    }

    private _getKey(key: string) {
        if (this.convertOptions && this.convertOptions.fromKeyCasing) {
            let cw = new CasedWord(key);
            return cw.toCase(this.convertOptions.fromKeyCasing);
        } else {
            return key;
        }
    }

    extends<U extends T>(validatorMap : ConvertValidatorKVMap<ExplicitAny, ObjectDiff<U, T>>) : ObjectConvertValidator<U> {
        return new ObjectConvertValidator<U>(_extend(this.validatorMap, validatorMap) as ConvertValidatorKVMap<ExplicitAny, U>)
    }
}

// think of something called objectFactory.

export interface IsObjectFactory<T extends object, KEY extends keyof T> extends ObjectIsaValidator<T> {
    readonly key : KEY;
}

// export let isEmptyObject : ObjectIsaValidator<{}>;
export let isEmptyObject: IsaValidator<{}> = isObject({}).where((obj) => Object.keys(obj).length === 0)

////// OBJECT MAP
class ObjectMapIsaValidator<T> extends BaseIsaValidator<{[key: string]: T}> {
    readonly inner: IsaValidatorCompat<T>;
    constructor(validator: IsaValidatorCompat<T>) {
        super();
        this.inner = validator;
    }

    validate(value: ExplicitAny, path = '$'): ValidationResult<{[key: string]: T}> {
        if ((value instanceof Buffer) || (value instanceof Array) || !(value instanceof Object)) {
            return reject([{
                error: 'TypeError',
                path: path,
                expected: 'Object',
                actual: value
            }])
        }

        let errors = filterErrors(Object.keys(value).map((key) => {
            let validator = this.inner;
            return (typeof(validator) === 'function' ? validator() : validator).validate(value[key], path + '.' + key);
        }))
        if (errors.length > 0) {
            return reject(errors);
        } else { // isa validators don't change the values.
            return resolve(value);
        }
    }

    _toConvert(options: ConvertOptions) {
        const validator = isFunction(this.inner) ? this.inner() : this.inner;
        let convertMap = validator.toConvert(options);
        return new ObjectMapConvertValidator<T>(convertMap, options)
    }
}

class ObjectMapConvertValidator<T> extends BaseConvertValidator<ExplicitAny, {[key: string]: T}> {
    readonly inner: ConvertValidatorCompat<ExplicitAny, T>;
    constructor(inner: ConvertValidatorCompat<ExplicitAny, T>, convertOptions: ConvertOptions = {}) {
        super(convertOptions);
        this.inner = inner;
    }

    validate(value: ExplicitAny, path = '$'): ValidationResult<{[key: string]: T}> {
        if (!(value instanceof Object)) {
            return reject([{
                error: 'TypeError',
                path: path,
                expected: 'Object',
                actual: value
            }])
        }
        let errors: ExplicitAny[] = [];
        let changed = false;
        let keyMap: {[key: string]: string} = {};
        const validator = isFunction(this.inner) ? this.inner() : this.inner;
        let results = Object.keys(value).reduce((acc, key) => {
            let objectKey = this._getKey(key);
            keyMap[objectKey] = key;
            let propValue = value[objectKey];
            return validator.validate(propValue, path + '.' + key)
                .cata((v) => {
                    if (v !== propValue) {
                        changed = true;
                    }
                    acc[key] = v;
                    return acc;
                }, (e) => {
                    errors = errors.concat(e.errors);
                    return acc;
                })
        }, {} as {[key: string]: ExplicitAny});
        if (errors.length > 0) {
            return reject(errors);
        } else if (!changed) {
            return resolve(value);
        } else {
            Object.keys(value).forEach((key) => {
                if (!results.hasOwnProperty(keyMap[key])) {
                    results[key] = value[key];
                }
            })
            return resolve(results as {[key: string]: T})
        }
    }

    _getKey(key: string) {
        if (this.convertOptions && this.convertOptions.fromKeyCasing) {
            let cw = new CasedWord(key);
            return cw.toCase(this.convertOptions.fromKeyCasing);
        } else {
            return key;
        }
    }
}

export function isObjectMap<T>(inner : IsaValidatorCompat<T>) : ObjectMapIsaValidator<T> {
    return new ObjectMapIsaValidator(inner);
}
