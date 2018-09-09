import * as V from '../../lib'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as assert from 'assert';
import { allOf } from '../../lib/intersect';

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
        assert.deepEqual(true, V.wrapIsa(allOf(isFoo, isBaz)).isa({
            foo: 'test',
            xyz: true
        }))
    }

    @test assertTypeErrorObject() {
        let data = 'not an object'
        V.isObject({}).validate(data)
            .cata(() => {}, (errors) => {
                assert.deepEqual([{
                    error: 'TypeError',
                    path: '$',
                    expected: 'Object',
                    actual: data
                }], errors)
            })
    }

    @test assertKeyTypeError() {
        let data = {

        }
        isFoo.validate(data)
            .cata(() => {}, (errors) => {
                assert.deepEqual([{
                    error: 'TypeError',
                    path: '$.foo',
                    expected: 'string',
                    actual: undefined
                }], errors)
            })
    }
}
