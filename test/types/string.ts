import * as S from '../../lib/types/string';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class StringTest {
    @test isString () {
        return S.isString.validate('hello');
    }

    @test isInvalidString() {
        return expectError(S.isString.validate(true))
    }

    @test isStringLiteral() {
        return S.isStringLiteral('test').validate('test')
    }

    @test isInvalidStringLiteral() {
        return expectError(S.isStringLiteral('test').validate('wrong'))
    }
}
