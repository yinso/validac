import * as assert from 'assert';
import * as I from '../../lib/types/literal';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class LiteralTest {
    @test isLiteral() {
        I.isLiteral('test').assert('test')
    }

    @test isInvalidLiteral() {
        return expectError(I.isLiteral('test').validate('test1'))
    }
}
