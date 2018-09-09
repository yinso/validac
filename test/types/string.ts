import * as S from '../../lib/types/string';
import * as V from '../../lib/isa';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

@suite class StringTest {
    @test isString () {
        return S.isString.validate('hello');
    }

    @test isInvalidString() {
        return expectError(S.isString.validate(true))
    }

    @test isStringLiteral() {
        return V.isLiteral('test').validate('test')
    }

    @test isInvalidStringLiteral() {
        return expectError(V.isLiteral('test').validate('wrong'))
    }
}
