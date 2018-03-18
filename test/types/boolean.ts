import * as B from '../../lib/types/boolean';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class BooleanTest {
    @test isBoolean () {
        return B.isBoolean.validate(true);
    }

    @test isTrue() {
        return B.isTrue.validate(true)
    }

    @test isFalse() {
        return B.isFalse.validate(false)
    }
}
