import * as V from '../../lib'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as assert from 'assert';

type Foo = [ number, string, boolean ]

let isFoo = V.isTuple(V.isNumber, V.isString, V.isBoolean)

let convertFoo = V.convertTuple(V.convertNumber, V.convertString, V.convertBoolean)

@suite class TupleTest {
    @test canAssert() {
        isFoo.assert([1, 'a string', true])
    }

    @test canIsa() {
        assert.deepEqual(true, isFoo.isa([2, 'a string', false]))
        assert.deepEqual(false, isFoo.isa(['a string', 2, false]))
        assert.deepEqual(false, isFoo.isa([2, 'a string', false, 1]))
        assert.deepEqual(false, isFoo.isa([2, 'a string']))
    }

    @test canConvertTuple() {
        convertFoo.assert(['10', 'a string', 'true'])
    }
}
