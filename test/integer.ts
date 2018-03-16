import * as I from '../lib/integer';
import { suite, test, slow, timeout , expectError } from '../lib/test-util';

@suite class IntegerTest {
    @test isInteger () {
        return I.isInteger.validate(10);
    }

    @test parseInteger () {
        return I.parseInteger.validate('10')
    }
}
