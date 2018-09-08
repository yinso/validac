import * as D from '../../lib/types/date';
import { suite, test, slow, timeout , expectErrorAsync } from '../../lib/util/test-util';

@suite class DateTest {
    @test isDate () {
        return D.isDate.validate(new Date());
    }

    @test convertDate() {
        D.convertDate.assert('2000-01-01T00:00:00Z')
    }
}

