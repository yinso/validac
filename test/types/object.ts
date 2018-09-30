import * as V from '../../lib'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as assert from 'assert';

interface Foo {
    foo: Date;
}

let isFoo = V.isObject<Foo>({
    foo: V.isDate
})

let convertFoo = isFoo.toConvert();

interface Bar extends Foo {
    bar : string;
}

let isBar = isFoo.extends<Bar>({
    bar: V.isString
});

interface Baz {
    xyz: boolean;
}

let isBaz = V.isObject<Baz>({
    xyz: V.isBoolean
})

let date1S = '2001-01-01T00:00:00Z'
let date1 = new Date(date1S);

interface Baw extends Bar {
    nested: string[]
}

let isBaw = isBar.extends<Baw>({
    nested: V.isArray(V.isString)
})

@suite class ObjectTest {
    @test canAssert() {
        isFoo.assert({
            foo: date1
        })
        isBar.assert({
            foo: date1,
            bar: 'hello'
        })
    }
    @test canIsa() {
        assert.deepEqual(true, isFoo.isa({
            foo: date1
        }))
        assert.deepEqual(true, isBar.isa({
            foo: date1,
            bar: 'hello'
        }))
    }

    @test allOf() {
        assert.deepEqual(true, V.isAllOf(isFoo, isBaz).isa({
            foo: date1,
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
                    expected: 'Date',
                    actual: undefined
                }], errors)
            })
    }

    @test canConvertObject() {
        convertFoo.assert({
            foo: date1
        })
        assert.deepEqual({
           foo: date1 
        }, convertFoo.assert({
            foo: date1S
        }))
        assert.deepEqual({
           xyz: true 
        }, isBaz.convert({
            xyz: 'true'
        }))
    }

    @test canEmbedNestedArray() {
        isBaw.convert({
            foo: date1S,
            bar: 'a string',
            nested: [1 , true, null, undefined ]
        })
    }
}
