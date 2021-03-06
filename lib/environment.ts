import { IsaValidator, ExplicitAny, IsaValidatorCompat, normalizeIsaValidator, KeysMatching, StringKeys, NotInKeyOf, Omit2 } from "./base";
import type { isIsaValidatorCompat, TypeofIsaValidator } from "./isa";
import { isInteger, isNumber, isNull, isUndefined, isBoolean, isBuffer, isDate, isDomainName, isEmailAddress, isString, isUrl, isUuid } from "./types";
import { isCreditCardNumberString, isCreditCardNumber } from "./types/credit-card";

export type MappedValidator<T extends object> = {
    [P in keyof T]: IsaValidatorCompat<T[P]>
}

export type NormalEnv<T extends object> = Environment<{ [P in keyof T]: T[P] }>

// what is something that we'll use for comparisons of the types?
export class Environment<T extends object> {
    readonly map: MappedValidator<T>
    // readonly prev?: Environment;
    constructor(inner: MappedValidator<T>) {
        this.map = inner
    }

    has<K extends keyof T>(key: K): boolean {
        return this.map.hasOwnProperty(key)
    }

    get<K extends keyof T>(key: K): IsaValidator<T[K]> {
        // console.log(`********** Environment.get(${key})`, Object.keys(this.map))
        if (this.map.hasOwnProperty(key)) {
            return normalizeIsaValidator(this.map[key])
        } else {
            throw new Error(`UnknownIdentifier:${key}`)
        }
    }

    define<K extends NotInKeyOf<T>, T2>(key: K, validator: TypeofIsaValidator<string, T2>): NormalEnv<T & Record<K, T2>>
    define<K extends NotInKeyOf<T>, T2>(key: K, validator: IsaValidator<T2>): NormalEnv<T & Record<K, T2>>
    define<K extends NotInKeyOf<T>, T2>(key: K, validator: IsaValidator<T2>): NormalEnv<T & Record<K, T2>> {
        if (this.map.hasOwnProperty(key)) {
            throw new Error(`DuplicateIdentifier:${key}`)
        } else {
            return new Environment({ ...this.map, [ key ]: validator } as MappedValidator<T & Record<K, T2>>)
        }
    }
}

function _baseEnv() {
    return new Environment({})
        .define('boolean', isBoolean)
        .define('Buffer', isBuffer)
        .define('CreditCardNumber', isCreditCardNumber)
        .define('Date', isDate)
        .define('DomainName', isDomainName)
        .define('EmailAddress', isEmailAddress)
        .define('Integer', isInteger) // the only scalar as lower case?
        .define('null', isNull)
        .define('number', isNumber)
        .define('string', isString)
        .define('Url', isUrl)
        .define('Uuid', isUuid)
        .define('undefined', isUndefined)
}

export const baseEnv = _baseEnv()

export type TypeOfEnvironment<T> = T extends Environment<infer U> ? U : never

export type BaseEnvType = TypeOfEnvironment<typeof baseEnv>

export type KeysMatching1<T extends object, V> = {
    [K in StringKeys<T>]-?: K extends string ? V extends NonNullable<T[K]> ? K : never : never;
}

type test = KeysMatching1<BaseEnvType, boolean>

type optionalBase = Partial<BaseEnvType>

type omitBoolean = Omit2<optionalBase, 'boolean'>

