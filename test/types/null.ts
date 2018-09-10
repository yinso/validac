import * as N from '../../lib/types/null';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class NullTest {
    @test isNull() {
        return N.isNull.validate(null).cata(() => {})
    }

    @test isInvalidNull() {
        return expectError(N.isNull.validate('test'))
    }

}
