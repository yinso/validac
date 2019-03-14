import * as F from '../../lib/types/function';
import * as assert from 'assert';
import * as N from '../../lib/types/number';
import * as S from '../../lib/types/string';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import { ExplicitAny } from '../../lib';

@suite class FunctionTest {
    @test isFunction() {
        let foo = F.isFunction(N.isNumber, N.isNumber, N.isNumber).attach((a : number, b : number) => a + b); 
        // console.log(`************ functionSignature`, (foo as ExplicitAny).__$v)
    }

    @test canCallWithValidation() {
        let foo = F.isFunction(N.isNumber, N.isNumber, N.isNumber);
        assert.ok(foo.run((a : number, b : number) => a + b, 1 , 2));
        assert.throws(() => {
            foo.run<number>((a : number, b : number) => a + b, 'foo', 'bar');
        })
    }
}
