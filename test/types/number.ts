import * as N from '../../lib/types/number';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class NumberTest {
    @test isNumber () {
        N.isNumber.assert(10.5);
    }

    @test async isInvalidNumber() {
        return expectError(N.isNumber.validate('not a number'));
    }

    @test convertNumberFromString() {
        N.convertNumber.assert('10.5');
    }

    @test convertIntegerFromString() {
        N.convertNumber.assert('10');
    }

    @test convertInvalidNumber() {
        expectError(N.convertNumber.validate('not a number'))
    }
}
