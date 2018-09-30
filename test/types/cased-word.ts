import * as S from '../../lib/types/cased-word';
import * as L from '../../lib/types/literal';
import * as assert from 'assert';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

declare module '../../lib/base' { // for custom test below.
    enum CaseNames {
        Custom = 'Custom'
    }
}

@suite class CasedWordTest {
    @test isCasedWord () {
        let c1 = new S.CasedWord('isCasedWord');
        assert.equal(true, S.isCasedWord.isa(c1))
    }

    @test isCamelCaseString() {
        S.isCamelCaseString.assert('isCamelCase')
        expectError(S.isCamelCaseString.validate('NotCamelCase'))
        expectError(S.isCamelCaseString.validate('not-camel-case'))
        expectError(S.isCamelCaseString.validate('not_camel_case'))
        expectError(S.isCamelCaseString.validate('NOT_CAMEL_CASE'))
    }

    @test isPascalCaseString() {
        S.isPascalCaseString.assert('IsPascalCase')
        expectError(S.isPascalCaseString.validate('notPascalCase'))
        expectError(S.isPascalCaseString.validate('not_pascal_case'))
        expectError(S.isPascalCaseString.validate('not-pascal-case'))
        expectError(S.isPascalCaseString.validate('NOT_PASCAL_CASE'))
    }

    @test isKababCaseString() {
        S.isKababCaseString.assert('is-kabab-case')
        expectError(S.isKababCaseString.validate('notKababCase'))
        expectError(S.isKababCaseString.validate('NotKababCase'))
        expectError(S.isKababCaseString.validate('not_kabab_case'))
        expectError(S.isKababCaseString.validate('NOT_KABAB_CASE'))
    }

    @test isSnakeCaseString() {
        S.isSnakeCaseString.assert('is_snake_case')
        expectError(S.isSnakeCaseString.validate('notSnakeCase'))
        expectError(S.isSnakeCaseString.validate('NotSnakeCase'))
        expectError(S.isSnakeCaseString.validate('not-snake-case'))
        expectError(S.isSnakeCaseString.validate('NOT_SNAKE_CASE'))
    }

    @test isUpperSnakeCaseString() {
        S.isMacroCaseString.assert('IS_MACRO_CASE')
        expectError(S.isMacroCaseString.validate('notMacroCase'))
        expectError(S.isMacroCaseString.validate('NotMacroCase'))
        expectError(S.isMacroCaseString.validate('not-macro-case'))
        expectError(S.isMacroCaseString.validate('not_macro_case'))
    }

    @test canConvertCases() {
        let c1 = new S.CasedWord('isCasedWord');
        assert.equal('isCasedWord', c1.toString())
        assert.equal('isCasedWord', c1.toCase('Camel'))
        assert.equal('IsCasedWord', c1.toCase('Pascal'))
        assert.equal('is-cased-word', c1.toCase('Kabab'))
        assert.equal('is_cased_word', c1.toCase('Snake'))
        assert.equal('IS_CASED_WORD', c1.toCase('Macro'))
    }

    @test canAddCustomCase() {
        // what does our custom case do?
        // it uses '$' as delimiter, and capitalize the first word.
        S.registerCase({
            caseName: 'Custom',
            isCase: (v) => /^([A-Z][a-z0-9]*)(\$[A-Z][a-z0-9]*)*$/.test(v),
            fromCase: (str) => str.split('$').map((s) => s.toLowerCase()),
            toCase: (words) => words.map((str) => str[0].toUpperCase() + str.substring(1)).join('$')
        })
        let c1 = new S.CasedWord('Is$Cased$Word');        
        assert.equal('Is$Cased$Word', c1.toString())
        assert.equal('isCasedWord', c1.toCase('Camel'))
        assert.equal('IsCasedWord', c1.toCase('Pascal'))
        assert.equal('is-cased-word', c1.toCase('Kabab'))
        assert.equal('is_cased_word', c1.toCase('Snake'))
        assert.equal('IS_CASED_WORD', c1.toCase('Macro'))
        assert.equal('Is$Cased$Word', c1.toCase('Custom'))
    }
}
