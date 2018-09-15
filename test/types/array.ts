import * as A from '../../lib/types/array';
import * as S from '../../lib/types/string';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as D from '../../lib/types/date';
import * as assert from 'assert';

let isArrayOfDates = A.isArray(D.isDate)
let convertArrayOfDates = isArrayOfDates.toConvert();
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
        isArrayOfDates.assert(convertArrayOfDates.assert([
            '2018-01-01T00:00:00Z',
            new Date(),
        ]))
    }

    @test convertInvalidDates() {
        expectError(convertArrayOfDates.validate([
            'not a date',
            false,
            1234
        ]))
    }
}

