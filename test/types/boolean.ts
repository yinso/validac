import * as B from '../../lib/types/boolean';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class BooleanTest {
    @test isBoolean () {
        B.isBoolean.assert(true)
        B.isBoolean.assert(false)
    }

    @test parseBoolean () {
        B.parseBoolean.assert(true)
        B.parseBoolean.assert(false)
        B.parseBoolean.assert('true')
        B.parseBoolean.assert('false')
        B.parseBoolean.assert('TRUE')
        B.parseBoolean.assert('FALSE')
    }

    @test isTrue() {
        B.isTrue.assert(true)
    }

    @test parseTrue() {
        B.parseTrue.assert('true')
        B.parseTrue.assert('TRUE')
    }

    @test isFalse() {
        B.isFalse.assert(false)
    }

    @test parseFalse() {
        B.parseFalse.assert('false')
        B.parseFalse.assert('FALSE')
    }
}
