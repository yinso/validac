import { suite, test } from 'mocha-typescript'
import * as E from '../lib/environment'
import * as assert from 'assert'
import * as uuid from 'uuid'
import { Scalar, isString, match, isInstanceof } from '../lib'

let baseEnv: E.Environment
let childEnv: E.Environment
@suite
class EnvironmentTest {
    @test
    canCreateEnvironment() {
        baseEnv = E.baseEnv
        assert.equal(baseEnv instanceof E.Environment, true)
    }

    @test
    canValidateBoolean() {
        assert.ok(baseEnv.has('boolean'))
        const isBoolean = baseEnv.get('boolean')
        assert.equal(isBoolean.isa(true), true)
        assert.equal(isBoolean.isa(false), true)
        assert.equal(isBoolean.isa(null), false)
    }

    @test
    canVallidateBuffer() {
        assert.ok(baseEnv.has('Buffer'))
        const isBuffer = baseEnv.get('Buffer')
        assert.equal(isBuffer.isa(Buffer.from('abc')), true)
        assert.equal(isBuffer.isa(false), false)
    }

    @test
    canValidateDate() {
        assert.ok(baseEnv.has('Date'))
        const isDate = baseEnv.get('Date')
        assert.equal(isDate.isa(new Date()), true)
        assert.equal(isDate.isa(false), false)
    }

    @test
    canValidateDomainName() {
        assert.ok(baseEnv.has('DomainName'))
        const isDomainName = baseEnv.get('DomainName')
        assert.equal(isDomainName.isa(isDomainName.convert('foo.com')), true)
        assert.equal(isDomainName.isa(false), false)
    }

    @test
    canValidateEmailAddress() {
        assert.ok(baseEnv.has('EmailAddress'))
        const isEmailAddress = baseEnv.get('EmailAddress')
        assert.equal(isEmailAddress.isa(isEmailAddress.convert('foo@foo.com')), true)
        assert.equal(isEmailAddress.isa(false), false)
    }

    @test
    canVaidateInteger() {
        assert.ok(baseEnv.has('Integer'))
        const isInteger = baseEnv.get('Integer')
        assert.equal(isInteger.isa(isInteger.convert(10)), true) // this is not the expectation.
        assert.equal(isInteger.isa(10.1), false)
    }

    @test
    canValidateNull() {
        assert.ok(baseEnv.has('null'))
        const isNull = baseEnv.get('null')
        assert.equal(isNull.isa(null), true) // this is not the expectation.
        assert.equal(isNull.isa(10.1), false)
    }

    @test
    canValidateNumber() {
        assert.ok(baseEnv.has('number'))
        const isNumber = baseEnv.get('number')
        assert.equal(isNumber.isa(10.1), true) // this is not the expectation.
        assert.equal(isNumber.isa('string'), false)
    }

    @test
    canValidateString() {
        assert.ok(baseEnv.has('string'))
        const isString = baseEnv.get('string')
        assert.equal(isString.isa('string'), true) // this is not the expectation.
        assert.equal(isString.isa(10), false)
    }

    @test
    canValidateUrl() {
        assert.ok(baseEnv.has('Url'))
        const isUrl = baseEnv.get('Url')
        assert.equal(isUrl.isa(isUrl.convert('http://foo.com')), true) // this is not the expectation.
        assert.equal(isUrl.isa(10), false)
    }

    @test
    canValidateUuid() {
        assert.ok(baseEnv.has('Uuid'))
        const isUuid = baseEnv.get('Uuid')
        assert.equal(isUuid.isa(isUuid.convert(uuid.v4())), true) // this is not the expectation.
        assert.equal(isUuid.isa(10), false)
    }

    @test
    canValidateUndefined() {
        assert.ok(baseEnv.has('undefined'))
        const isUndefined = baseEnv.get('undefined')
        assert.equal(isUndefined.isa(undefined), true) // this is not the expectation.
        assert.equal(isUndefined.isa(10), false)
    }

    @test
    canCreateNewEnvironment() {
        childEnv = baseEnv.childScope()
        assert.equal(childEnv instanceof E.Environment, true)
    }

    @test
    canValidateViaParentEnv() {
        assert.ok(baseEnv.has('Integer'))
        assert.ok(baseEnv.has('boolean'))
        assert.ok(baseEnv.has('CreditCardNumber'))
    }

    @test
    canAddMoreType() {
        const isFooString = isString
            .where(match(/^foo$/i))
        class Foo extends Scalar<'Foo', string> {
            static convertFooString = isFooString
                .transform((v) => new Foo('Foo', v))
        }

        const isFoo = isInstanceof(Foo, 'Foo')
        isFoo.appendConvert(Foo.convertFooString)

        childEnv.define('Foo', isFoo)
        assert.ok(childEnv.has('Foo'))
        assert.ok(!baseEnv.has('Foo'))

        let validator = childEnv.get('Foo')
        let value = validator.convert('FOO')
        assert.equal(value instanceof Foo, true)
    }

}
