import { IsaValidator, ExplicitAny } from "./base";
import { isInteger, isNumber, isNull, isUndefined, isBoolean, isBuffer, isDate, isDomainName, isEmailAddress, isString, isUrl, isUuid } from "./types";
import { isCreditCardNumberString } from "./types/credit-card";

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

export function baseEnv(): Environment {
    const env = new Environment()
    env.define('boolean', isBoolean)
    env.define('Buffer', isBuffer)
    env.define('CreditCardNumber', isCreditCardNumberString)
    env.define('Date', isDate)
    env.define('DomainName', isDomainName)
    env.define('EmailAddress', isEmailAddress)
    env.define('Integer', isInteger) // the only scalar as lower case?
    env.define('null', isNull)
    env.define('number', isNumber)
    env.define('string', isString)
    env.define('Url', isUrl)
    env.define('Uuid', isUuid)
    env.define('undefined', isUndefined)
    return env
}
