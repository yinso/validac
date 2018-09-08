import * as B from '../../lib/types/boolean';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class BooleanTest {
    @test isBoolean () {
        B.isBoolean.assert(true)
        B.isBoolean.assert(false)
    }

    @test convertBoolean () {
        B.convertBoolean.assert(true)
        B.convertBoolean.assert(false)
        B.convertBoolean.assert('true')
        B.convertBoolean.assert('false')
        B.convertBoolean.assert('TRUE')
        B.convertBoolean.assert('FALSE')
    }

    @test isTrue() {
        B.isTrue.assert(true)
    }

    @test convertTrue() {
        B.convertTrue.assert('true')
        B.convertTrue.assert('TRUE')
    }

    @test isFalse() {
        B.isFalse.assert(false)
    }

    @test convertFalse() {
        B.convertFalse.assert('false')
        B.convertFalse.assert('FALSE')
    }
}
