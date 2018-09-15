import * as D from '../../lib/types/date';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class DateTest {
    @test isDate () {
        D.isDate.assert(new Date());
    }

    @test isNotDate () {
        ['not a date', 21304987, true, null]
            .forEach((v) => expectError(D.isDate.validate(v)))
    }

    @test convertDate() {
        D.isDate.toConvert().assert('2000-01-01T00:00:00Z')
    }

    @test convertNotDate () {
        ['not a date', 21304987, true, null]
            .forEach((v) => expectError(D.isDate.toConvert().validate(v)))
    }
}

