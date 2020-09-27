import * as assert from 'assert';
import * as I from '../lib/isa';
import * as S from '../lib/types/string';
import * as N from '../lib/types/number';
import * as _N from '../lib/types/null';
import * as L from '../lib/types/literal';
import * as O from '../lib/types/object';
import * as A from '../lib/types/array';
import { suite, test, slow, timeout , expectError } from '../lib/util/test-util';
import { IsaValidator } from '../lib';

@suite class IsaTest {
    @test isa() {
        I.isa((v : Date) : v is Date => v instanceof Date, 'date')
            .assert(new Date())
        assert.deepEqual(true, S.isString.isa('a string'))
    }

    @test isInstanceof() {
        I.isInstanceof(Date, 'date')
            .assert(new Date())
    }

    @test invalidIsa() {
        expectError(I.isa((v : number) : v is number => typeof(v) === 'number', 'number')
            .validate(new Date()))
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
        let validator = S.isString.union(N.isNumber).union(_N.isNull);
        ['hello', 5].forEach((item) => validator.assert(item))
    }

    @test isOptional() {
        let validator = S.isString.isOptional();
        [undefined, 'test'].forEach((item) => validator.assert(item))
    }

    @test defaultTo() {
        let isDefaultString = S.isString.defaultTo(() => 'hello world')
        isDefaultString.assert('a string')
        expectError(isDefaultString.validate(undefined)) // the Isa version doesn't convert.
        isDefaultString.convert('a string')
        isDefaultString.convert(undefined)
    }

    @test testAllOf() {
        let validator = I.isAllOf(S.isString, L.isLiteral('test'))
        validator.assert('test')
    }


    @test testOneOf() {
        let validator = I.isOneOf(S.isString, _N.isNull, N.isNumber)
        validator.assert('test')
        validator.assert(null)
        validator.assert(15.1)
    }

    @test testIsIsaValidator() {
        let validator = I.isOneOf(S.isString, _N.isNull, N.isNumber)
        let isIsaValidator1 = I.isIsaValidator<string | number | null>();
        assert.equal(true, isIsaValidator1.isa(validator));
    }

    @test testIsChoiceValidator() {
        interface Foo {

        }
        let isFoo = I.isChoice<Foo>();

        class Foo2 implements Foo {

        }
        let isFoo2 = I.isInstanceof(Foo2, 'Foo2');
        isFoo2.appendConvert(L.isLiteral('Foo2').transform((v) => new Foo2()))
        isFoo.push(isFoo2);

        class Foo3 implements Foo {

        }
        let isFoo3 = I.isInstanceof(Foo3, 'Foo3');
        isFoo3.appendConvert(L.isLiteral('Foo3').transform((v) => new Foo3()))
        isFoo.push(isFoo3);
        assert.equal(isFoo.convert('Foo2') instanceof Foo2, true)
        assert.equal(isFoo.convert('Foo3') instanceof Foo3, true)
    }
}

type RecursiveOneOf = string | { foo : RecursiveOneOf };

@suite class IsOneOfTest {
    @test canAssert() {
        [null, 'a string']
            .forEach((v) => I.isOneOf(_N.isNull, S.isString).assert(v))
    }

    @test canTestRecursiveOneOf() {
        let isRecursiveOneOf = I.isOneOf(S.isString, O.isObject({
            foo: () : IsaValidator<RecursiveOneOf> => isRecursiveOneOf
        }))
        assert.equal(true, isRecursiveOneOf.isa('a recursive oneof'))
        assert.equal(true, isRecursiveOneOf.isa({ foo: 'a recursive one of' }))
    }
}

type RecursiveAllOf = { bar : string } & { foo : RecursiveAllOf[] }

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
        }].forEach((v) => I.isAllOf(isFoo, isBar).assert(v))
    }

    @test canTestRecurisveAllOf() {
        let isRecursiveAllOf = I.isAllOf(O.isObject({
            bar: S.isString
        }), O.isObject({
            foo: () : IsaValidator<RecursiveAllOf[]> => A.isArray(isRecursiveAllOf)
        }))
        assert.equal(true, isRecursiveAllOf.isa({ bar: 'a recursive allof', foo: [
            {
                bar: 'a nested recursive allof',
                foo: []
            }
        ]}))
    }
}