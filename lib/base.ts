import { ObjectMapIsaValidator } from "./types";

export type ExplicitAny = any

export type Tagged<KEY extends string, T> = Record<KEY, T>;

export type Omit<T extends {[key: string]: ExplicitAny; }, KEY extends keyof T> = Pick<T, Exclude<keyof T, KEY>>;

export type Normalize<T extends object> = {
    [P in keyof T]: T[P]
}

export interface Validator<T, U> {
    assert(v : T, path ?: string) : U;
    validate(v : T, path ?: string) : ValidationResult<U>;
}

export abstract class BaseValidator<T, U> implements Validator<T, U> {
    abstract validate(value : T, path ?: string) : ValidationResult<U>;
    assert(value : T, path : string = '$') : U {
        return this.validate(value, path).cata((v) => v)
    }
}

export type ConstraintPredicate<T> = (v : T) => boolean;

export interface Constraint<T> {
    satisfy(v : T, path ?: string) : ValidationError[];
    and(constraint : Constraint<T>) : Constraint<T>;
    or(constraint: Constraint<T>) : Constraint<T>;
    not() : Constraint<T>;
}

export type DefaultProc<T> = () => T;

export type TransformProc<T, U> = (v : T) => U;

export interface ConvertValidator<T, U> extends Validator<T, U> {
    where(constraint : Constraint<U> | ConstraintPredicate<U>) : ConvertValidator<T, U>;
    intersect<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U & V>;
    union<V>(validator : ConvertValidator<T, V>) : ConvertValidator<T, U | V>;
    isOptional() : ConvertValidator<T, U | undefined>;
    transform<V>(transform : TransformProc<U, V>) : ConvertValidator<T, V>;
    defaultTo(defaultProc : DefaultProc<U>) : ConvertValidator<T, U>;
}

export type ConvertValidatorProc<T, U> = () => ConvertValidator<T, U>;

export type ConvertValidatorCompat<T, U> = ConvertValidator<T, U> | ConvertValidatorProc<T, U>;

export enum CaseNames {
    Camel = 'Camel',
    Pascal = 'Pascal',
    Kebab = 'Kebab',
    Snake = 'Snake',
    Macro = 'Macro',
}

export type CaseNameKeys = keyof typeof CaseNames;

export interface ConvertOptions {
    fromKeyCasing ?: CaseNameKeys;
}

export interface IsaValidator<T> extends Validator<ExplicitAny, T>, Type<T> {
    isa(v : ExplicitAny, path ?: string) : v is T;
    where(constraint : Constraint<T> | ConstraintPredicate<T>) : IsaValidator<T>;
    intersect<U>(validator : IsaValidator<U>) : IsaValidator<T & U>;
    union<U>(validator : IsaValidator<U>) : IsaValidator<T | U>;
    isOptional() : IsaValidator<T | undefined>;
    transform<U>(transform : TransformProc<T, U>) : ConvertValidator<ExplicitAny, U>;
    defaultTo(defaultProc : DefaultProc<T>) : IsaValidator<T>;
    toConvert(options ?: ConvertOptions) : ConvertValidator<ExplicitAny, T>;
    convert(v : ExplicitAny, path ?: string) : T;
    appendConvert(converter : ConvertValidator<ExplicitAny, T>) : void;
}

export type IsaValidatorProc<T> = () => IsaValidator<T>;

export type IsaValidatorCompat<T> = IsaValidator<T> | IsaValidatorProc<T>;

export type IsaPredicate<T> = (v : any) => v is T;

export interface ValidationError {
    readonly error: string;
    readonly path : string;
    readonly expected: any;
    readonly actual: any;
}

export type SuccessDB<T, U> = (v : T, res : ValidationResult<T>) => U;
export type ErrorCB<T, U> = (error : ValidationErrorResult<T>) => U;

export interface ValidationResult<T> {
    cata<U>(onSuccess : SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U;
}

export function resolve<U>(value : U) {
    return new SuccessResult<U>(value);
}

export function reject<U>(e : ValidationError | ValidationError[] | ValidationErrorResult<U>) {
    if (isValidationError<U>(e))
        return e;
    if (e instanceof Array) {
        return new ValidationErrorResult<U>(e);
    } else {
        return new ValidationErrorResult<U>([e]);
    }
}

export function allOf<U>(results : ValidationResult<U>[]) : ValidationResult<U[]> {
    // what is the outcome fo the 
    let result : U[] = [];
    let errors : ValidationError[] = [];
    results.forEach((res) => {
        res.cata((value) => {
            result.push(value)
        }, (err) => {
            errors = errors.concat(err.errors)
        })
    });
    if (errors.length > 0) {
        return reject(errors);
    } else {
        return resolve(result);
    }
}

export function oneOf<U>(results : ValidationResult<U>[]) : ValidationResult<U> {
    let isValid = false;
    let index = -1;
    let errors : ValidationError[] = [];
    results.forEach((res, i) => {
        res.cata((r) => {
            isValid = true,
            index = i
        }, (err) => {
            errors = errors.concat(err.errors)
        })
    })
    if (isValid) {
        return results[index];
    } else {
        return reject(errors);
    }
}

export function filterErrors(results : ValidationResult<ExplicitAny>[]) : ValidationError[] {
    let errors : ValidationError[] = [];
    results.forEach((res, i) => {
        res.cata((r) => {
            },(err) => {
                errors = errors.concat(err.errors)
            })
    })
    return errors;
}

export class SuccessResult<T> implements ValidationResult<T> {
    readonly value : T;
    constructor(value : T) {
        this.value = value;
    }

    cata<U>(onSuccess: SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U {
        return onSuccess(this.value, this);
    }
}

export class ValidationErrorResult<T> extends Error implements ValidationResult<T> {
    readonly errors : ValidationError[];
    constructor(errors: ValidationError[]) {
        super();
        Object.setPrototypeOf(this, ValidationErrorResult.prototype);
        this.name = 'ValidationError';
        this.errors = errors;
        this.message = JSON.stringify(this.errors, null, 2)
    }

    cata<U>(onSuccess: SuccessDB<T, U>, onError ?: ErrorCB<T, U>) : U {
        if (!onError) {
            throw this;
        } else {
            return onError(this);
        }
    }

    toJSON() {
        return {
            error: this.name,
            errors: this.errors
        }
    }
}

(<any>Object).setPrototypeOf(ValidationErrorResult.prototype, Error.prototype); // this is the magic line that saves effort from extending objects.

export function isValidationResult<T>(item : any) : item is ValidationResult<T> {
    return !!item && typeof(item.cata) === 'function';
}

export function isValidationSuccess<T>(item : any) : item is SuccessResult<T> {
    return item instanceof SuccessResult;
}

export function isValidationError<T>(item : any) : item is ValidationErrorResult<T> {
    return item instanceof ValidationErrorResult;
}

// type definition.
// a type definition is a "name" for the type.
// we can think of this similar to JSON schema (though JSON schema isn't extensible so this isn't directly a JSON Schema)
// it's either a string for simple types, or an object for complex types.
// e.g. 'string' => isString, 'number' => isNumber, 'any' => isAny, 'boolean' => isBoolean.
// composite types would be something like this:
// Array { $array: <inner> }
// Tuple { $tuple: [<first>, <second>, ...] }
// Object { $object: { <key>: <value>, ... } }
// ObjectMap { $objectMap: <inner> }
// Union { $or: [<first>, <second>, ... ] }
// Intersection { $and: [<first>, <second>, ... ]}

// this is an new attribute for the type structure.
export interface ArrayTypeDef {
    readonly $array: TypeDef
}

export interface TupleTypeDef {
    readonly $tuple: TypeDef[]
}

export interface ObjectTypeDef {
    readonly $object: {
        [key: string]: TypeDef
    }
}

export interface ObjectMapTypeDef {
    readonly $objectMap: TypeDef
}

export interface UnionTypeDef {
    readonly $and: TypeDef[]
}

export interface IntersectionTypeDef {
    readonly $or: TypeDef[]
}

export interface EnumTypeDef {
    readonly $enum: TypeDef[]
}

export interface LiteralTypeDef {
    readonly $lit: string | number | boolean | null
}

export interface OptionalTypeDef {
    readonly $optional: TypeDef
}

export type TypeDef =
    string |
    ArrayTypeDef |
    TupleTypeDef |
    ObjectTypeDef |
    ObjectMapTypeDef |
    UnionTypeDef |
    IntersectionTypeDef |
    EnumTypeDef |
    LiteralTypeDef |// more complex then the actual type.
    OptionalTypeDef

export interface Type<S> {
    readonly $type: TypeDef
    isa(v: unknown): v is S
    convert(v: unknown): S
}
