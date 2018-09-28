import * as S from '../../lib/types/cased-word';
import * as L from '../../lib/types/literal';
import * as assert from 'assert';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';

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
        S.isUpperSnakeCaseString.assert('IS_SNAKE_CASE_UPPER')
        expectError(S.isUpperSnakeCaseString.validate('notSnakeCaseUpper'))
        expectError(S.isUpperSnakeCaseString.validate('NotSnakeCaseUpper'))
        expectError(S.isUpperSnakeCaseString.validate('not-snake-case-upper'))
        expectError(S.isUpperSnakeCaseString.validate('not_snake_case_upper'))
    }

    @test canConvertCases() {
        let c1 = new S.CasedWord('isCasedWord');
        assert.equal('isCasedWord', c1.toString())
        assert.equal('isCasedWord', c1.toCamelCase())
        assert.equal('IsCasedWord', c1.toPascalCase())
        assert.equal('is-cased-word', c1.toKababCase())
        assert.equal('is_cased_word', c1.toSnakeCase())
        assert.equal('IS_CASED_WORD', c1.toUpperSnakeCase())
    }
}
