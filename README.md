# Validac - A **Valida**tion **C**ombinator Library

`Validac` is a **Valida**tion **C**ombinator library written in TypeScript, where you can build up a complex validator via combining simple ones, and generate the right type signature for the validated value.

## Install

```bash
npm install --save validac
```

## Usage

```typescript
import * as V from 'validac';

// isa => determine whether the value is of the type. This can be used as a type guard.
V.isString.isa('this is a string') // => true, type => string
V.isString.isa(1234) // => false

// validate => returns the raw ValidationResult, for if you need to handle the result and error yourself.
V.isString.validate('this is a string') // => SuccessResult { value : 'this is a string' }
V.isString.validate(1234) // throws an error
// => FailedResult { errors: [{ error: 'TypeError', type: 'string', path: '$', actual: 1234 }] } // validation error is an array of errors.

// assert - returns the result, or throw error if the value fails the validation.
V.isNumber.assert(1234) // => 1234, type => number
V.isNumber.assert('not number') // throws the FailedResult error.

// convert
V.isNumber.convert('1234') // ==> 1234
V.isNumber.convert('not a number') // ==> Error

// Value object pattern. V.Integer is a built-in value object that wraps numbers that are integers.
V.isInteger.convert('1234') // => V.Integer { _value: 1234 }, type => V.Integer

// Validating an array of a particular type.
V.isArray(V.isNumber).assert([1, 2, 3, 4]) // => [1, 2, 3, 4], type => number[]
V.isArray(V.isNumber).assert([1, 2, 'not a number', 4]) // => throws

// validating an object.
interface Foo {
    foo: string;
}

let isFoo = V.isObject<Foo>({
    foo: V.isString
});

isFoo.assert({ foo: 'a string' }) // => { foo: 'a string' }, type => Foo
isFoo.assert({ }) // throws

// extending Foo
interface Bar extends Foo {
    bar: number;
}

let isBar = isFoo
    .extends<Bar>({
        bar: V.isNumber
    });

isBar.assert({ bar: 1 }) // throws
isBar.assert({ foo: 'a string', bar: 1 }) // => { foo: 'a string', bar: 1 }, type => Bar

```
## Basic Usages

With each of the combinators (the built-in ones are listed below), you can use the following methods:

### `.isa(v : any) : v is T`

If you need to test whether a value is of a particular type, you can use the `.isa` method, which maps to an appropriate type guard.

```typescript
let value : any = ... // value is of type any here.
if (V.isString.isa(value)) {
    // the vaue has the type string here.
}
```

> `.isa` is only available on validators that are based on `IsaValidator<T>` type to ensure that you can use it appropriately for type-guard purposes, as other types of `Validator` might generate new values instead of retaining the old values.

### `.assert(v : any) : T`

`.assert` will take in a value and attempt to return the value as type `T`, and throws error otherwise.

```typescript
V.isDate.assert(new Date()) // => Date
V.isDate.assert('not a date') // throws

// parsing, this converts the type.
V.isDate.convert('2000-01-01T00:00:00Z') // => Date
V.isDate.convert('not a date') // throws
```

### `.validate(v : any) : ValidationResult<T>`

Both `.isa` and `.convert` are built on top of `.validate`, which returns a `ValidationResult<T>` object that contains either the result of type `T`, or an array of error of the type `ValidationError[]`.

Use `.validate` when you want to handle the result yourself (a scenario would be when you are writing your own combinators, or trying to integrate into other frameworks).

> TODO: add info about `ValidationResult<T>`.

## Built-in Combinators

`Validac` comes with quite a few built-in combinators and ready-to-go types so you can just can use it without having to know much about the internals. The following combinators are provided for you to enhance your validators.

### `V.isa<T>(pred : (v : any) => v is T, name : string) : Validator<T>`

`isa` is the initial validator to use for determining the type of the value. i.e. it converts from `any` to `T`.

For example - this is the definition for `V.isString`:

```typescript
let isString = V.isa((v : any) : v is string => typeof(v) === 'string', 'string')
```

Note that `V.isa` on its own isn't meant to be used for data conversions, i.e. it's structured to only test the type of the values, rather than trying to convert from string to number, for example.

The following are built-in `V.isa` validators:

* `V.isAny : Validator<any>`
* `V.isBoolean : Validator<boolean>`
* `V.isDate : Validator<Date>`
* `V.isNumber : Validator<number>`
* `V.isString : Validator<string>`

### `V.isLiteral<T extends string|number|boolean|null|undefined>(v : T) : Validator<T>`

`V.isLiteral` is used to test the type for a single literal value. TypeScript provides type definition for literal types, so we also have this as a Validator.

An example - you can do:

```typescript
let validator = isLiteral('foo');

validator.assert('foo') // => 'foo'

validator.assert('bar') // throws
```

The following are built-in `V.isLiteral` validators:

* `V.isTrue : Validator<true>`
* `V.isFalse : Validator<false>`
* `V.isNull : Validator<null>`
* `V.isUndefined : Validator<undefined>`

### `V.isEnum<...T extends number|string>(...vars : T[]) : Vaidator<T>`

`V.isEnum` is an union of multiple `V.isLiteral` validators.

For example, we can define the status of a TODO application as follows:

```typescript
type ToDoStatus = 'new' | 'in-progress' | 'postponed' | 'completed';
let isTodoStatus = V.isEnum('new', 'in-progress', 'postponed', 'completed');
```

`V.isEnum` is set so you can only use enum of the same type at this time. I.e. it's either a set of `string` literals, or a set of `number` literals.

### `V.isArray(item : Validator<T>) : Validator<T[]>`

`V.isArray` takes in an `Validator<T>` for the items inside the array. All items inside the array must pass the inner validator.

```typescript

let isNumberArray : Validator<number[]> = V.isArray(V.isNumber)
isNumberArray.assert([1, 2, 3]) // [1, 2, 3]
isNumberArray.assert([1, 'not a number', 2]) // throws

```

### `V.isTuple(item1Validator : Validator<T1>, item2Validator: Validator<T2>...) : Validator<[T1, T2, ...]>`

`V.isTuple` takes in a tuple, which is a fixed array of different types in TypeScript. The array must have the exact number of items and exact the type type in order to pass.

```typescript

type Vector = [ number , number , number ] // an array of 3 numbers.

let isVector = V.isTuple(V.isNumber, V.isNumber, V.isNumber)

isVector.assert([0, 0, 0]) // => [0, 0, 0], type Vector

```

### `V.isObject({ key1: Validator<T1>, key2: Validator<T2>, ...}) : Validator<{ key1: T1, key2: T2, ...}>`

`V.isObject` takes in an object comprised of key/Validator pairs, and returns a validator for validating an object with the corresponding key/value types.

```typescript

interface Vector {
    x: number;
    y: number;
    z: number;
}

let isVector = V.isObject<Vector>({
    x: V.isNumber,
    y: V.isNumber,
    z: V.isNumber
})

isVector.assert({x: 0, y: 0, z: 0}) // { x: 0, y: 0, z: 0}, type => Vector
```

### `V.isObjectMap<T>(inner : V.IsaValidator<T>) => V.IsaValidator<{[key: string], T}>`

`V.isObjectMap` takes in an inner validator and returns a validator of type `T` that can be used to vaildate values of the type `{[key: string]: T}`.

```typescript
let isVectorObjectMap = V.isObjectMap(isVector);

isVector.assert({
    origin: { x: 0, y: 0, z: 0},
    topLeft : { x: -10, y: -10, z: 0},
    bottomRight: { x: 10, y: 10, z: 10}
})
```


### `V.isTaggedObjectFactory<key, Type>(key, { ... })`

`isTaggedObjectFactory` models after a family of classes that shares a tag as a key - for exmaple below is the family of `Element` interfaces:

```typescript
// an Element as a tag property as the key.
interface Element {
    tag: string;
}

interface Image extends Element {
    tag: 'Image';
    title: string;
    url: string;
}

interface LineElement extends Element { }

interface LineElementWithChildren extends LineElement {
    children: Element[];
}

interface LineBreak extends LineElement {
    tag: 'LineBreak';
}

interface Bold extends LineElementWithChildren {
    tag: 'Bold';
}

```

To represent them in `validac`, you use `isTaggedObjectFactory` as follows:

```typescript
let isElement = V.isTaggedObjectFactory<'tag', Element>('tag', {
});
let isImage = isElement.register<'Image', Image>('Image', {
    title: V.isString,
    url: V.isString
})
// isElement can validate `Image` element now.
isElement.assert({ tag: 'Image', title: 'test image', url: 'http://test/test.png' }) // OK

let isLineElement = isElement.extends<LineElement>({}); // a new factory.
let isLineBreak = isLineElement.register<'LineBreak', LineBreak>('LineBreak', {});

// another factory.
let isLineElementWithChildren = isLineElement.extends<LineElementWithChildren>({
    children: V.isArray<Element>(isElement)
});

let isBold = isLineElementWithChildren.register<'Bold', Bold>('Bold', {});

// isElement can be used to validate LineBreak and Bold as well.
```

## Building Blocks

At the most basic level, all validators has the following signature:

```typescript
interface Validator<T> {
    validate(value : any, path ?: string) : ValidationResult<T>;
}
```

`ValidationResult<T>` is an opaque structure that has the following property:

```
    cata<U>(onSuccess: (v : T) => U, onError: (e : Error) => U)
```

This is fairly low level and you don't need to use it. In general, you can use `.assert` and `.isa` helper that will get what you want.

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
    .cata((result : T) => ..., (errors : ValidationError[]) => ...) 
```

### Constraints: `.where(constraint : Constraint<T>)`

The `.where` combinator decorates the current validator with additional constraint logics.

A constraint is defined as the following:

```typescript
interface Constraint<T> {
    satisfy(v : T, path : string) : boolean;
}
```

`Constraint<T>` differs from `Validator<T>` in that it doesn't handle type conversions - it simply provides a `boolean` value to determine whether the value itself meets the constraint.
