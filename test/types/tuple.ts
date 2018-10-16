import * as V from '../../lib'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as assert from 'assert';
import { IsaValidator } from '../../lib';

type Foo = [ number, string, boolean ]

let isFoo = V.isTuple(V.isNumber, V.isString, V.isBoolean)

let convertFoo = isFoo.toConvert()

/*
class Bar<T> {
    constructor(x : T) {

    }
}

type BarArray<T extends any[], K extends Extract<keyof T, number> = Extract<keyof T, number>>
    = Bar<T[K]>[];

function makeTuple<T extends any[]>(...params : BarArray<T>) {
    throw new Error()
}

let x = makeTuple<Foo>(new Bar<string>('1'), new Bar<string>('1'), new Bar<string>('1'), new Bar<string>('1'))
//*/

type RecursiveTuple = [ number , string , { foo : RecursiveTuple[] } ]

@suite class TupleTest {
    @test canAssert() {
        isFoo.assert([1, 'a string', true])
    }

    @test canIsa() {
        assert.deepEqual(true, isFoo.isa([2, 'a string', false]))
        assert.deepEqual(false, isFoo.isa(['a string', 2, false]))
        assert.deepEqual(false, isFoo.isa([2, 'a string', false, 1]))
        assert.deepEqual(false, isFoo.isa([2, 'a string']))
    }

    @test canConvertTuple() {
        convertFoo.assert(['10', 'a string', 'true'])
    }

    @test canConvertRecursiveTuple() {
        let isRecursiveTuple = V.isTuple(V.isNumber, V.isString, V.isObject<{ foo : RecursiveTuple[] }>({
            foo: () : IsaValidator<RecursiveTuple[]> => V.isArray(isRecursiveTuple)
        }));
        assert.deepEqual(true, isRecursiveTuple.isa([1, 'string', { foo: [
                    [ 2 , 'test', { foo : [] } ],
                    [ 3 , 'foo', {
                            foo: [
                                [ 4, 'bar', { foo: [] } ]
                            ]
                        }
                    ]
                ]
            }
        ]));
    }
}
