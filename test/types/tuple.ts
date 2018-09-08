import * as V from '../../lib'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as assert from 'assert';

type Foo = [ number, string, boolean ]

let isFoo = V.isTuple(V.isNumber, V.isString, V.isBoolean)

@suite class TupleTest {
    @test canAssert() {
        isFoo.assert([1, 'a string', true])
    }

    @test canIsa() {
        assert.deepEqual(true, isFoo.isa([2, 'a string', false]))
    }
}
