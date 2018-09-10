import * as assert from 'assert';
import * as I from '../lib/isa';
import * as E from '../lib/isa-extended';
import * as S from '../lib/types/string';
import * as N from '../lib/types/number';
import * as _N from '../lib/types/null';
import * as O from '../lib/types/object';
import { suite, test, slow, timeout , expectError } from '../lib/util/test-util';

@suite class IsOneOfTest {
    @test canAssert() {
        [null, 'a string']
            .forEach((v) => E.isOneOf(_N.isNull, S.isString).assert(v))
    }
}

@suite class IsAllOfTest {
    @test canAssert() {
        let isFoo = O.isObject({
            foo: N.isNumber
        });
        let isBar = O.isObject({
            bar: S.isString
        });
        [{
            foo: 1, bar: 'a string'
        }].forEach((v) => E.isAllOf(isFoo, isBar).assert(v))
    }
}