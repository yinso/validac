import * as U from '../../lib/types/undefined';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class UndefinedTest {
    @test isUndefined() {
        return U.isUndefined.validate(undefined);
    }

    @test isInvalidUndefined() {
        return expectError(U.isUndefined.validate('test'));
    }

}
