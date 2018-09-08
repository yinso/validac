import * as V from '../../lib'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as assert from 'assert';
import { allOf } from '../../lib';

interface Foo {
    foo: string;
}

let isFoo = V.isObject<Foo>({
    foo: V.isString
})

interface Bar extends Foo {
    bar : string;
}

let isBar = isFoo.extends({
    bar: V.isString
}).cast<Bar>();

interface Baz {
    xyz: boolean;
}

let isBaz = V.isObject({
    xyz: V.isBoolean
}).cast<Baz>()

@suite class ObjectTest {
    @test canAssert() {
        isFoo.assert({
            foo: 'test'
        })
        isBar.assert({
            foo: 'test',
            bar: 'hello'
        })
    }
    @test canIsa() {
        assert.deepEqual(true, isFoo.isa({
            foo: 'test'
        }))
        assert.deepEqual(true, isBar.isa({
            foo: 'test',
            bar: 'hello'
        }))
    }

    @test allOf() {
        assert.deepEqual(true, V.allOf(isFoo, isBaz).isa({
            foo: 'test',
            xyz: true
        }))
    }
}
