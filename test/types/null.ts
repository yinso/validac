import * as N from '../../lib/types/null';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class NullTest {
    @test isNull () {
        return N.isNull.validate(null);
    }
}