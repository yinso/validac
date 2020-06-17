import * as assert from 'assert';
import * as I from '../lib/convert';
import * as E from '../lib/convert';
import * as S from '../lib/types/string';
import * as N from '../lib/types/number';
import * as O from '../lib/types/object';
import * as A from '../lib/types/array';
import { suite, test, slow, timeout , expectError } from '../lib/util/test-util';
import { ConvertValidator, isLiteral, isOneOf } from '../lib';

type RecursiveOneOf = string | { foo : RecursiveOneOf };

@suite class ConvertOneOfTest {
    @test canAssert() {
        ['1234', 'a string']
            .forEach((v) => E.convertOneOf(N.isNumber.toConvert(), S.isString.toConvert()).assert(v))
    }

    @test canConvertCompositeObject() {
        interface TimestampLiteral {
            readonly timestamp: string;
        }
        
        const isTimestampLiteral = O.isObject<TimestampLiteral>({
            timestamp: S.isString
        })
        
        interface StringLiteral {
            readonly string: string;
        }
        
        const isStringLiteral = O.isObject<StringLiteral>({
            string: S.isString
        });
        
        interface IntegerLiteral {
            readonly integer: number;
        }
        
        const isIntegerLiteral = O.isObject<IntegerLiteral>({
            integer: N.isNumber
        })
        
        interface DoubleLiteral {
            readonly double: number;
        }
        
        const isDoubleLiteral = O.isObject<DoubleLiteral>({
            double: N.isNumber
        })
        
        const isDefaultValue = isOneOf(
            isLiteral('autoincrement'),
            isIntegerLiteral,
            isDoubleLiteral,
            isTimestampLiteral,
            isStringLiteral,
        );

        let testCase = [
            // {
            //     input: { timestamp: 'now' },
            //     expected: { timestamp: 'now' }
            // },
            {
                input: { string: 'now' },
                expected: { string: 'now' }
            },
            // {
            //     input: { integer: 15 },
            //     expected: { integer: 15 }
            // },

        ]
        testCase.forEach((tc) => {
            let actual = isDefaultValue.convert(tc.input);
            assert.deepEqual(actual, tc.expected);
        })

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