import * as N from '../lib/null';
import { suite, test, slow, timeout , expectError } from '../lib/test-util';

@suite class NullTest {
    @test isNull () {
        return N.isNull.validate(null);
    }
}