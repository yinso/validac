import * as S from '../../lib/types/string';
import * as L from '../../lib/types/literal';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class StringTest {
    @test isString () {
        return S.isString.validate('hello');
    }

    @test isInvalidString() {
        return expectError(S.isString.validate(true))
    }

    @test isStringLiteral() {
        return L.isLiteral('test').validate('test')
    }

    @test isInvalidStringLiteral() {
        return expectError(L.isLiteral('test').validate('wrong'))
    }

    @test willRejectNull() {
        return expectError(S.isString.validate(null))
    }

    @test willRejectNullWithLengthCheck() {
        return expectError(S.isString.where((v: string) => v.length < 10).validate(null))
    }
}
