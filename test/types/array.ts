import * as A from '../../lib/types/array';
import * as S from '../../lib/types/string';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as D from '../../lib/types/date';
import * as assert from 'assert';

@suite class ArrayTest {
    @test isArrayOfString () {
        A.isArray(S.isString).assert(['hello', 'world']);
    }

    @test isInvalidArrayOfString() {
        expectError(A.isArray(S.isString).validate(['hello', 'world', 5]))
    }

    @test canIsa() {
        assert.equal(true, A.isArray(S.isString).isa(['test', 'array']))
    }

    @test isArrayofConterDate() {

    }

    @test canConvertDates() {
        let isArrayOfDates = A.isArray(D.isDate)
        let convertArrayOfDates = A.convertArray(D.convertDate);
        isArrayOfDates.assert(convertArrayOfDates.assert([
            '2018-01-01T00:00:00Z',
            new Date(),
        ]))
    }

    @test convertInvalidDates() {
        let convertArrayOfDates = A.convertArray(D.convertDate);
        expectError(convertArrayOfDates.validate([
            'not a date',
            false,
            1234
        ]))
    }
}

