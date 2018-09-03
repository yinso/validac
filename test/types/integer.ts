import * as I from '../../lib/types/integer';
import { suite, test, slow, timeout , expectErrorAsync, expectError } from '../../lib/util/test-util';

// because Integer is a Value Object, we cannot directly validate a *number*.
@suite class IntegerTest {
    @test isInteger () {
        I.isInteger.assert(I.Integer.fromJSON(10)); // we want this to be validated.
    }

    @test isNotInteger () {
        expectError(I.isInteger.validate(10));
    }

    @test isNumber () {
        expectError(I.isInteger.validate(10.5));
    }

    @test parseIntegerFromString () {
        I.parseInteger.assert('10')
    }

    @test parseIntegerFromNumber () {
        I.parseInteger.assert(10)
    }

    @test parseNumberFail () {
        expectError(I.parseInteger.validate('10.5'))
    }

    @test parseNumberFailFromNumber () {
        expectError(I.parseInteger.validate(10.5))
    }

    @test fromJSON() {
        I.Integer.fromJSON('1')
        I.Integer.fromJSON(1)
    }
}
