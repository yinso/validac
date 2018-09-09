import * as assert from 'assert'
import * as E from '../../lib/types/enum'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

type Foo = 'hello' | 'world' | 'foo';

let isFoo = E.isEnum('hello', 'world', 'foo')

let convertFoo = E.convertEnum('hello', 'world', 'foo')

@suite class EnumTest {
    @test isEnum() {
        [
            'hello',
            'world',
            'foo'
        ].forEach((item) => isFoo.assert(item))
    }

    @test isNotEnum() {
        [
            'xyz',
            'abc',
            'def'
        ].forEach((item) => expectError(isFoo.validate(item)))
    }

    @test canConvertEnum() {

        [
            'hello',
            'world',
            'foo'
        ].forEach((item) => convertFoo.assert(item))
    }

    @test errorConvertInvalidEnum() {
        [
            'xyz',
            'abc',
            'def'
        ].forEach((item) => expectError(convertFoo.validate(item)))
    }
}
