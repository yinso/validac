import * as N from '../../lib/types/number';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class NumberTest {
    @test isNumber () {
        return N.isNumber.validate(10.5);
    }

    @test async isInvalidNumber() {
        return expectError(N.isNumber.validate('hello'));
    }

    @test parseNumber() {
        return N.parseNumber.validate('10.5');
    }

    @test parseInvalidNumber() {
        return expectError(N.parseNumber.validate('hello'))
    }
}
