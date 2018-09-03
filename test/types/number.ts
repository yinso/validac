import * as N from '../../lib/types/number';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class NumberTest {
    @test isNumber () {
        N.isNumber.assert(10.5);
    }

    @test async isInvalidNumber() {
        return expectError(N.isNumber.validate('hello'));
    }

    @test parseNumber() {
        N.parseNumber.assert('10.5');
    }

    @test parseInteger() {
        N.parseNumber.assert('10');
    }

    @test parseInvalidNumber() {
        expectError(N.parseNumber.validate('hello'))
    }
}
