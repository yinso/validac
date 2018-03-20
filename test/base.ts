import * as assert from 'assert';
import * as V from '../lib/validator';
import * as S from '../lib/types/string';
import * as N from '../lib/types/number';
import { suite, test, slow, timeout , expectError } from '../lib/util/test-util';
import { ValidationResult } from '../lib';

@suite class BaseTest {
    @test isa() {
        return V.isa((v : Date) : v is Date => v instanceof Date, 'date')
            .validate(new Date());
    }

    @test invalidIsa() {
        return expectError(V.isa((v : number) : v is number => typeof(v) === 'number', 'number')
            .validate(new Date()));
    }

    @test isAny() {
        return Promise.all([
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
        ].map((item) => V.isAny.validate(item)));
    }

    @test isLiteral() {
        return V.isLiteral('test').validate('test');
    }

    @test isInvalidLiteral() {
        return expectError(V.isLiteral('test').validate('test1'));
    }

    @test isEnum() {
        ValidationResult.allOf([
            'hello',
            'world',
            'foo'
        ].map((item) => V.isEnum('hello', 'world', 'foo').validate(item)))
            .cata(() => { })
    }

    @test isUndefined() {
        return V.isUndefined.validate(undefined);
    }

    @test isInvalidUndefined() {
        return expectError(V.isUndefined.validate('test'));
    }

    @test isNull() {
        return V.isNull.validate(null);
    }

    @test isInvalidNull() {
        return expectError(V.isNull.validate('test'))
    }

    @test where() {
        return S.isString
            .where(S.match(/^[+-]?\d+$/))
            .validate('12305608')
    }

    @test transform() {
        return S.isString
            .where(S.match(/^[+-]?\d+(\.\d+)?$/))
            .transform(parseFloat)
            .validate('1234')
            .then((v) => {
                assert.equal(v, 1234)
            })
    }

    @test and() {
        let validator = S.isString.and(N.isNumber); // nothing will match!!
        return expectError(validator.validate(1));
    }

    @test or() {
        let validator = S.isString.or(N.isNumber).or(V.isNull)
        return ValidationResult.allOf(['hello', 5].map((item) => validator.validate(item)))
            .cata(() => {})
    }

    @test isOptional() {
        let validator = S.isString.isOptional();
        return ValidationResult.allOf([undefined, 'test'].map((item) => validator.validate(item)))
            .cata(() => {})
    }

    @test defaultTo() {
        let validator = S.isString.defaultTo(() => 'hello world')
        return validator.validate(undefined)
            .then((res) => {
                assert.equal(res, 'hello world');
            })
    }
}
