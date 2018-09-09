import * as assert from 'assert';
import * as I from '../lib/isa';
import * as S from '../lib/types/string';
import * as N from '../lib/types/number';
import * as X from '../lib/intersect';
import * as U from '../lib/union';
import { suite, test, slow, timeout , expectError } from '../lib/util/test-util';

@suite class IsaTest {
    @test isa() {
        I.isa((v : Date) : v is Date => v instanceof Date, 'date')
            .assert(new Date())
        assert.deepEqual(true, S.isString.isa('a string'))
    }

    @test invalidIsa() {
        expectError(I.isa((v : number) : v is number => typeof(v) === 'number', 'number')
            .validate(new Date()))
    }

    @test isAny() {
        [
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
        ].forEach((item) => I.isAny.assert(item))
    }

    @test isLiteral() {
        I.isLiteral('test').assert('test')
    }

    @test isInvalidLiteral() {
        return expectError(I.isLiteral('test').validate('test1'))
    }

    @test isUndefined() {
        return I.isUndefined.validate(undefined);
    }

    @test isInvalidUndefined() {
        return expectError(I.isUndefined.validate('test'));
    }

    @test isNull() {
        return I.isNull.validate(null).cata(() => {})
    }

    @test isInvalidNull() {
        return expectError(I.isNull.validate('test'))
    }

    @test where() {
        return S.isString
            .where(S.match(/^[+-]?\d+$/))
            .validate('12305608')
            .cata(() => {})
    }

    @test transform() {
        S.isString
            .where(S.match(/^[+-]?\d+(\.\d+)?$/))
            .transform(parseFloat)
            .validate('1234')
            .cata((v) => {
                assert.equal(v, 1234)
            })
    }

    @test intersect() {
        let validator = S.isString.intersect(N.isNumber); // nothing will match!!
        return expectError(validator.validate(1));
    }

    @test union() {
        let validator = S.isString.union(N.isNumber).union(I.isNull);
        ['hello', 5].forEach((item) => validator.assert(item))
    }

    @test isOptional() {
        let validator = S.isString.isOptional();
        [undefined, 'test'].forEach((item) => validator.assert(item))
    }

    @test defaultTo() {
        let validator = S.isString.defaultTo(() => 'hello world')
        validator.assert(undefined)
    }

    @test testAllOf() {
        let validator = X.allOf(S.isString, I.isLiteral('test'))
        validator.assert('test')
    }


    @test testOneOf() {
        let validator = U.oneOf(S.isString, I.isNull, N.isNumber)
        validator.assert('test')
        validator.assert(null)
        validator.assert(15.1)
    }
}
