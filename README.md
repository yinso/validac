# Validac - A **Valida**tion **C**ombinator Library

`Validac` is an async **valida**tion **c**ombinator library written in TypeScript, where you can build up a complex validator via combining simple ones.

## Install

```bash
npm install --save validac
```

## Usage

```typescript
import * as V from 'validac';
import * as assert from 'assert';

// this already exist - you can do V.isString
let isString = V.isa((v: any) : v is string => typeof(v) === 'string', 'string')

// also exist - use V.parseNumber
let parseNumber = isString
    .where(V.match(/^[+-]?\d+(\.d+)?$/)) // constraints
    .to(parseFloat) // transformation.

parseNumber
    .validate('150')
    .then((v) => assert.equal(v, 150));

parseNumber
    .validate('not a number')
    .catch(console.log)
/* => [ {
    error: 'TypeMismatch',
    schema: { pattern: '^[+-]?\\d+(\\.\\d+)?$' },
    path: '$',
    actual: 'not a number'
} ]
*/

// V.isNumber exists.
let isNumber = V.isa((v : any) : v is number => typeof(v) === 'number', 'number')

let isOrParseNumber = isNumber.or(parseNumber)
// this now can handle either a number, or a stringified number.






```

## Build Blocks

At the most basic level, all validators has the following signature:

```typescript
interface Validator<T, TInput = any> {
    validate(value : TInput, path ?: string) : ValidationResult<T>;
}
```

`ValidationResult<T>` is currently defined as `Promise<T>`, but in the future it might be enhanced to
be its own type, so be sure to make use of `ValidationResult<T>` if you are writing your own `Validator` to work with `Validac`.

The success condition of `ValidationResult<T>` returns a result with the type `T`. The error condition of `ValidationResult<T>`
returns an array of `ValidationError`, which has the following definitions:

```typescript
interface ValidationError {
    readonly error: string;
    readonly path: string;
    readonly schema: any; // a JSON Schema fragment that signifies the details for the particular error.
    readonly actual: any;
}
```

i.e. `ValidationResult<T>` does the following:

```typescript
validator
    .then((result : T) => ...)
    .catch((errors : ValidationError[]) => ...) 
```

## Combinators

The following combinators are provided for you to enhance your validators.

### `isa<T>(pred : (v : any) => v is T, name : string)`

`isa` is the initial validator to use for determining the type of the value. i.e. it converts from `any` to `T`.

For example - this is the definition for `isString`:

```typescript
let isString = isa((v : any) : v is string => typeof(v) === 'string', 'string')
```

Note that `isa` on its own isn't meant to be used for data conversions, i.e. it's structured to only test the type of the values, rather than trying to convert from string to number, for example.

The following are built-in `isa` validators:

* `isAny : Validator<any, any>`
* `isArray : Validator<any[], any> // do I want this?`
* `isBoolean : Validator<boolean, any>`
* `isDate : Validator<Date, any>`
* `isNumber : Validator<number, any>`
* `isObject : Validator<{[key: string]: any}, any>`
* `isString : Validator<string, any>`

### `isLiteral<T extends string|number|boolean|null|undefined>(v : T)`

`isLiteral` is used to test the type for a single literal value. TypeScript provides type definition for literal types, so we also have this as a Validator.

An example - you can do:

```typescript
let validator = isLiteral('foo');

validator.validate('foo')
    .then((v : 'foo') => console.log(v)) // 'foo'

validator.validate('bar')
    .catch(console.error) // TypeMisMatch, expect foo.
```

The following are built-in `isLiteral` validators:

* `isTrue : Validator<true, any>`
* `isFalse : Validator<false, any>`
* `isNull : Validator<null, any>`
* `isUndefined : Validator<undefined, any>`

### `isEnum<...T extends number|string>(...vars : T[])`

`isEnum` is an union of multiple `isLiteral` validators.

For example, we can define the status of a TODO application as follows:

```typescript
let isTodoStatus = isEnum('new', 'in-progress', 'postponed', 'completed')
// Validator<'new' | 'in-progress' | 'postponed' | 'completed', any>
```

`isEnum` is set so you can only use enum of the same type at this time. I.e. it's either a set of `string` literals, or a set of `number` literals.

### Constraints: `.where(constraint : Constraint<T>)`

The `.where` combinator decorates the current validator with additional constraint logics.

A constraint is defined as the following:

```typescript
interface Constraint<T> {
    satisfy(v : T, path : string) : boolean;
}
```

`Constraint<T>` differs from `Validator<T, TInpt>` in that it doesn't handle type conversions - it simply provides a `boolean` value to determine whether the value itself meets the constraint.



