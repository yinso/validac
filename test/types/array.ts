import * as A from '../../lib/types/array';
import * as S from '../../lib/types/string';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as D from '../../lib/types/date';
import * as N from '../../lib/types/number';
import * as O from '../../lib/types/object';
import * as assert from 'assert';
import { IsaValidator } from '../../lib';

let isArrayOfDates = A.isArray(D.isDate)
let convertArrayOfDates = isArrayOfDates.toConvert();

interface RecursiveFoo {
    foo: string;
    nested : RecursiveFoo[];
}

@suite class ArrayTest {
    @test isArrayOfString () {
        A.isArray(S.isString).assert(['hello', 'world']);
    }

    @test isInvalidArrayOfString() {
        expectError(A.isArray(S.isString).validate(['hello', 'world', 5]))
    }

    @test canIsa() {
        assert.equal(true, A.isArray(S.isString).isa(['test', 'array']))
    }

    @test isArrayofConterDate() {

    }

    @test canConvertDates() {
        isArrayOfDates.assert(convertArrayOfDates.assert([
            '2018-01-01T00:00:00Z',
            new Date(),
        ]))
    }

    @test convertInvalidDates() {
        expectError(convertArrayOfDates.validate([
            'not a date',
            false,
            1234
        ]))
    }

    @test canDoNestedObjectArray() {
        let isa = O.isObject({
            result: O.isObject({
                foo: A.isArray(N.isNumber)
            }),
            remainder: S.isString
        })
        assert.equal(true, isa.isa({
            result: {
                foo: [ 1, 2, 3 ],
            },
            remainder: 'a remainder'
        }))
    }

    @test canDoRecursiveArray() {
        let isRecursiveFooArray = A.isArray(O.isObject<RecursiveFoo>({
            foo: S.isString,
            nested: () : IsaValidator<RecursiveFoo[]> => isRecursiveFooArray
        }))
        assert.equal(true, isRecursiveFooArray.isa([
            {
                foo: 'string',
                nested: [
                    {
                        foo: 'string',
                        nested: []
                    }
                ]
            }
        ]))
    }
}

