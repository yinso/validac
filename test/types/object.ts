import * as V from '../../lib'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

interface Foo {
    foo: string;
}

let fooTest = V.isObject<any, Foo>({
    foo: V.isString
})

interface Bar extends Foo {
    bar : string;
}

let barTest = fooTest.extends({
    bar: V.isString
}).cast<Bar>();

@suite class ObjectTest {
    @test try() {
        fooTest.assert({
            foo: 'test'
        })
        barTest.assert({
            foo: 'test',
            bar: 'hello'
        })
    }
}
