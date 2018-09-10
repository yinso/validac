import * as assert from 'assert';
import * as I from '../lib/convert';
import * as E from '../lib/convert-extended';
import * as S from '../lib/types/string';
import * as N from '../lib/types/number';
import * as O from '../lib/types/object';
import { suite, test, slow, timeout , expectError } from '../lib/util/test-util';

@suite class ConvertOneOfTest {
    @test canAssert() {
        ['1234', 'a string']
            .forEach((v) => E.convertOneOf(N.convertNumber, S.convertString).assert(v))
    }
}

@suite class ConvertAllOfTest {
    @test canAssert() {
        let isFoo = O.convertObject({
            foo: N.convertNumber
        });
        let isBar = O.convertObject({
            bar: S.convertString
        });
        [
            {
                foo: 1, bar: 'a string'
            },
            {
                foo: '10', bar: true
            },
        ].forEach((v) => E.convertAllOf(isFoo, isBar).assert(v))
    }
}