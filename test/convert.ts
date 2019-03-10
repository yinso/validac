import * as assert from 'assert';
import * as I from '../lib/convert';
import * as E from '../lib/convert';
import * as S from '../lib/types/string';
import * as N from '../lib/types/number';
import * as O from '../lib/types/object';
import * as A from '../lib/types/array';
import { suite, test, slow, timeout , expectError } from '../lib/util/test-util';
import { ConvertValidator } from '../lib';

type RecursiveOneOf = string | { foo : RecursiveOneOf };

@suite class ConvertOneOfTest {
    @test canAssert() {
        ['1234', 'a string']
            .forEach((v) => E.convertOneOf(N.isNumber.toConvert(), S.isString.toConvert()).assert(v))
    }
}

@suite class ConvertAllOfTest {
    @test canAssert() {
        let isFoo = O.isObject({
            foo: N.isNumber
        });
        let isBar = O.isObject({
            bar: S.isString
        });
        [
            {
                foo: 1, bar: 'a string'
            },
            {
                foo: '10', bar: true
            },
        ].forEach((v) => E.convertAllOf(isFoo.toConvert(), isBar.toConvert()).assert(v))
    }

    @test canConvertIsOptional() {
        let validator = S.isString.isOptional();
        assert.equal('this is a string', validator.toConvert().assert('this is a string'))
        assert.equal(undefined, validator.toConvert().assert(undefined))
    }
}