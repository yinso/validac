import * as A from '../../lib/types/array';
import * as S from '../../lib/types/string';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class ArrayTest {
    @test isArrayOfString () {
        return A.isArray(S.isString).validate(['hello', 'world']);
    }

    @test isInvalidArrayOfString() {
        return A.isArray(S.isString).validate(['hello', 'world', 5])
            .then((res) => {
                throw new Error(`Unexpected Success`)
            }, (errors) => {
                return;
            });
    }
}
