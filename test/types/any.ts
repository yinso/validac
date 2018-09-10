import * as A from '../../lib/types/any';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class AnyTest {
    @test isAny() {
        [
            undefined,
            null,
            1,
            0,
            '',
            'hello',
            true,
            false,
            [],
            {}
        ].forEach((item) => A.isAny.assert(item))
    }
}
