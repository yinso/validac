import * as assert from 'assert';
import * as A from '../../lib/types/any';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

let items = [
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
]

@suite class AnyTest {
    @test isAny() {
        items.forEach((item) => A.isAny.assert(item))
    }

    @test convertAny() {
        items.forEach((item) => assert.deepEqual(item, A.isAny.toConvert().assert(item)))
    }
}
