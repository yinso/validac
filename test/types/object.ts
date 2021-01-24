import * as V from '../../lib'
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import * as assert from 'assert';
import * as uuid from 'uuid';
import { IsaValidator, isObjectMap, isObject, isString, ObjectIsaValidator } from '../../lib';
import { stringify } from 'querystring';
import { boolean } from 'yargs';

interface Foo {
    foo: Date;
}

let isFoo = V.isObject<Foo>({
    foo: V.isDate
})

let convertFoo = isFoo.toConvert();

interface Bar extends Foo {
    bar : string;
}

let isBar = isFoo.extends<Bar>({
    bar: V.isString
});

interface Baz {
    xyz: boolean;
}

let isBaz = V.isObject<Baz>({
    xyz: V.isBoolean
})

let date1S = '2001-01-01T00:00:00Z'
let date1 = new Date(date1S);

interface Baw extends Bar {
    nested: string[]
}

let isBaw = isBar.extends<Baw>({
    nested: V.isArray(V.isString)
})

interface User {
    userId: V.Uuid,
    userName: V.EmailAddress
}

let isUser = V.isObject<User>({
    userId: V.isUuid,
    userName: V.isEmailAddress,
})



interface UserProfile extends User {
    phoneNumber: string;
}

let isUserProfile = isUser.extends<UserProfile>({
    phoneNumber: V.isString
})

interface RecursiveFoo {
    foo: string;
    inner : RecursiveFoo[];
}

@suite class ObjectTest {
    @test canAssert() {
        isFoo.assert({
            foo: date1
        })
        isBar.assert({
            foo: date1,
            bar: 'hello'
        })
    }
    @test canIsa() {
        assert.deepEqual(true, isFoo.isa({
            foo: date1
        }))
        assert.deepEqual(true, isBar.isa({
            foo: date1,
            bar: 'hello'
        }))
    }

    @test allOf() {
        assert.deepEqual(true, V.isAllOf(isFoo, isBaz).isa({
            foo: date1,
            xyz: true
        }))
    }

    @test assertTypeErrorObject() {
        let data = 'not an object'
        V.isObject({}).validate(data)
            .cata(() => {}, (errors) => {
                assert.deepEqual({
                    error: 'ValidationError',
                    errors:
                    [{
                        error: 'TypeError',
                        path: '$',
                        expected: 'Object',
                        actual: data
                    }]
                }, errors.toJSON())
            })
    }

    @test assertKeyTypeError() {
        let data = {

        }
        isFoo.validate(data)
            .cata(() => {}, (errors) => {
                assert.deepEqual([{
                    error: 'TypeError',
                    path: '$.foo',
                    expected: 'Date',
                    actual: undefined
                }], errors.errors)
            })
    }

    @test canConvertObject() {
        convertFoo.assert({
            foo: date1
        })
        assert.deepEqual({
           foo: date1 
        }, convertFoo.assert({
            foo: date1S
        }))
        assert.deepEqual({
           xyz: true 
        }, isBaz.convert({
            xyz: 'true'
        }))
    }

    @test canEmbedNestedArray() {
        isBaw.convert({
            foo: date1S,
            bar: 'a string',
            nested: [1 , true ]
        })
    }

    @test canConvertFromDifferentKeyCasing() {
        let id = uuid.v4()
        let emailAddress = 'test@test.com'
        let result = isUser.toConvert({
            fromKeyCasing: 'Snake'
        }).assert({
            user_id: id,
            user_name: emailAddress
        });
        assert.deepEqual({
            userId: new V.Uuid(id),
            userName: new V.EmailAddress(emailAddress)
        }, result)

        let phone = '555-555-1212'
        let result2 = isUserProfile.toConvert({
            fromKeyCasing: 'Snake'
        }).assert({
            user_id: id,
            user_name: emailAddress,
            phone_number: phone
        });
        assert.deepEqual({
            userId: new V.Uuid(id),
            userName: new V.EmailAddress(emailAddress),
            phoneNumber: phone
        }, result2)
    }

    @test canDoRecursiveObjectType() {
        let isRecursiveFoo = V.isObject<RecursiveFoo>({
            foo: V.isString,
            inner: () :V.IsaValidator<RecursiveFoo[]> => { return V.isArray(isRecursiveFoo) }
        })
        assert.deepEqual(true, isRecursiveFoo.isa({
            foo: 'a string',
            inner: [
                {
                    foo: 'test',
                    inner: [
                        {
                            foo: 'test 2',
                            inner: []
                        }
                    ]
                }
            ]
        }))
    }

    @test canMatchEmptyObject() {
        assert.equal(true, V.isEmptyObject.isa({}));
        assert.equal(false, V.isEmptyObject.isa({ foo: 1 }));
    }

    @test canHandleOptionalParams() {
        interface Foo1 {
            readonly foo: number;
            readonly bar?: string;
        }

        const isFoo1 = V.isObject<Foo1>({
            foo: V.isNumber,
            bar: V.isString.isOptional()
        })

        assert.ok(isFoo1.isa({ foo: 10 }))
        assert.ok(isFoo1.isa({ foo: 10, bar: 'test' }))
        assert.ok(isFoo1.isa({ foo: 10, bar: undefined }))
        assert.deepEqual(isFoo1.convert({ foo: 10 }), { foo: 10 })
        assert.deepEqual(isFoo1.convert({ foo: 10, bar: 'test' }), { foo: 10, bar: 'test' })
        assert.deepEqual(isFoo1.convert({ foo: 10, bar: undefined }), { foo: 10, bar: undefined })
    }

    @test canRejectUndefinedOptionalParams() {
        interface Foo1 {
            readonly foo: number;
            readonly bar?: string;
        }

        const isFoo1 = V.isObject<Foo1>({
            foo: V.isNumber,
            bar: V.isString.isOptional()
        }, { rejectUndefinedParam: true })

        assert.ok(isFoo1.isa({ foo: 10 }))
        assert.ok(isFoo1.isa({ foo: 10, bar: 'test' }))
        assert.ok(!isFoo1.isa({ foo: 10, bar: undefined }))
        assert.deepEqual(isFoo1.convert({ foo: 10 }), { foo: 10 })
        assert.deepEqual(isFoo1.convert({ foo: 10, bar: 'test' }), { foo: 10, bar: 'test' })
        assert.throws(() => isFoo1.convert({ foo: 10, bar: undefined }))
    }

}

let isFooObjectMap : V.IsaValidator<{[key: string]: Foo}>;

@suite class ObjectMapTest {

    @test canCreateObjectMap() {
        isFooObjectMap = V.isObjectMap(isFoo);
    }

    @test canValidateObjectMap() {
        assert.equal(true, isFooObjectMap.isa({
            test: {
                foo: new Date(),
                bar: 'hello'
            },
            test2: {
                foo: new Date(),
                bar: 'stuff'
            }
        }))
    }

    @test canConvertObjectMap() {
        let result = isFooObjectMap.toConvert().assert({
            test: {
                foo: (new Date()).toISOString(),
                bar: 'hello'
            },
            test2: {
                foo: (new Date()).toISOString(),
                bar: 'hello'
            }
        })
        isFooObjectMap.assert(result);
    }

    @test
    wontValidateBuffer() {
        const isNumberMap = isObjectMap(V.isNumber);
        assert.equal(isNumberMap.isa(Buffer.from('test buffer is not map')), false);
    }

    @test
    canEnsureOptionalKeysArentFilledIn() {
        interface Column {
            readonly name: string;
            readonly type: string;
            readonly primary?: boolean;
            readonly unique?: boolean;
            readonly nullable?: boolean;
            readonly default?: any;  
        }

        const isColumn = V.isObject<Column>({
            name: V.isString,
            type: V.isString,
            primary: V.isBoolean.isOptional(),
            unique: V.isBoolean.isOptional(),
            nullable: V.isBoolean.isOptional(),
            default: V.isAny.isOptional()
        })

        const c1: Column = { name: 'c1', type: 'int' }
        const c2: Column = { name: 'c1', type: 'int', primary: true }
        const c3: Column = { name: 'c1', type: 'int', unique: true }
        const c4: Column = { name: 'c1', type: 'int', default: '' }
        assert.deepEqual(isColumn.convert(c1), c1)
        assert.deepEqual(isColumn.convert(c2), c2)
        assert.deepEqual(isColumn.convert(c3), c3)
        assert.deepEqual(isColumn.convert(c4), c4)
    }
}

interface OptionalObj {
    readonly p1: string
    readonly p2: string
    readonly p3?: string
}

const isOptionalObj = isObject({})
    .field({ key: 'p1', type: isString })
    .field({ key: 'p2', type: isString })
    .field({ key: 'p3', type: isString, optional: true })

const isOptionalObj2: ObjectIsaValidator<OptionalObj> = isOptionalObj

const isMinusOptionalP3 = isOptionalObj.delete('p3')

const Minus2Props = isOptionalObj.subset(['p1'])

