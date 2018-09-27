import * as assert from 'assert';
import * as S from '../../lib/types/string';
import * as U from '../../lib/types/uuid';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import { ValidationResult } from '../../lib';
import * as uuid from 'uuid';

// constraint should also be a combinator thing!!!
@suite class UuidTest {
    @test isUuid() {
        U.isUuidString.assert(uuid.v1())
        U.isUuidString.assert(uuid.v4())
        expectError(U.isUuidString.validate('test'))
        U.isUuid.assert(U.Uuid.fromJSON(uuid.v4()))
    }

    @test convertUuid() {
        let u1 = uuid.v4()
        let result = U.convertUuid.assert(u1)
        assert.equal(u1, result.toString())
        assert.equal(u1, result.valueOf())
        assert.equal(u1, result.toJSON())
    }
}
