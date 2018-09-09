import * as assert from 'assert'
import * as E from '../../lib/types/enum'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class EnumTest {
    @test isEnum() {
        let testEnum = E.isEnum('hello', 'world', 'foo');
        [
            'hello',
            'world',
            'foo'
        ].forEach((item) => testEnum.assert(item))
    }
    @test isNotEnum() {
        let testEnum = E.isEnum('hello', 'world', 'foo');
        [
            'xyz',
            'abc',
            'def'
        ].forEach((item) => expectError(testEnum.validate(item)))
    }
}
