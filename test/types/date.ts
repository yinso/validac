import * as D from '../../lib/types/date';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class DateTest {
    @test isDate () {
        return D.isDate.validate(new Date());
    }
}
