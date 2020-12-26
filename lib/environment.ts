import { IsaValidator, ExplicitAny } from "./base";
import { isInteger, isNumber, isNull, isUndefined, isBoolean, isBuffer, isDate, isDomainName, isEmailAddress, isString, isUrl, isUuid } from "./types";
import { isCreditCardNumberString, isCreditCardNumber } from "./types/credit-card";

// what is something that we'll use for comparisons of the types?
export class Environment {
    readonly inner: Map<string, IsaValidator<ExplicitAny>>;
    readonly prev?: Environment;
    constructor(prev?: Environment) {
        this.inner = new Map()
        if (prev) {
            this.prev = prev
        }
    }

    has(key: string, recursive: boolean = true): boolean {
        const v = this.tryGet(key, recursive)
        return !!v;
    }

    get(key: string, recursive: boolean = true): IsaValidator<ExplicitAny> {
        const v = this.tryGet(key, recursive)
        if (v) {
            return v;
        } else {
            throw new Error(`UnknownIdentifier:${key}`)
        }
    }

    tryGet(key: string, recursive: boolean): IsaValidator<ExplicitAny> | undefined {
        const v = this.inner.get(key)
        if (v) {
            return v;
        } else if (recursive && this.prev) {
            return this.prev.tryGet(key, recursive)
        } else {
            return undefined;
        }
    }

    define(key: string, validator: IsaValidator<ExplicitAny>) {
        if (this.has(key, false)) {
            throw new Error(`DuplicateIdentifier:${key}`)
        } else {
            this.set(key, validator)
        }
    }

    set(key: string, validator: IsaValidator<ExplicitAny>) {
        this.inner.set(key, validator)
    }

    childScope(): Environment {
        return new Environment(this)
    }   
}

function _baseEnv() {
    const _env = new Environment()
    _env.define('boolean', isBoolean)
    _env.define('Buffer', isBuffer)
    _env.define('CreditCardNumber', isCreditCardNumber)
    _env.define('Date', isDate)
    _env.define('DomainName', isDomainName)
    _env.define('EmailAddress', isEmailAddress)
    _env.define('Integer', isInteger) // the only scalar as lower case?
    _env.define('null', isNull)
    _env.define('number', isNumber)
    _env.define('string', isString)
    _env.define('Url', isUrl)
    _env.define('Uuid', isUuid)
    _env.define('undefined', isUndefined)
    return _env
}

export const baseEnv = _baseEnv()
