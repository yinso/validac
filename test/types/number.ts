import * as N from '../../lib/types/number';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class NumberTest {
    @test isNumber () {
        N.isNumber.assert(10.5);
    }

    @test async isInvalidNumber() {
        return expectError(N.isNumber.validate('not a number'));
    }

    @test convertNumber() {
        N.convertNumber.assert('10.5');
        N.convertNumber.assert('10');
        N.convertNumber.assert(10.5);
    }

    @test convertInvalidNumber() {
        expectError(N.convertNumber.validate('not a number'))
    }
}
