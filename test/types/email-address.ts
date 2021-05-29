import * as assert from 'assert';
import * as S from '../../lib/types/string';
import * as E from '../../lib/types/email-address';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import { ValidationResult } from '../../lib';

let email1 = 'foo@bar.com';
let email2 = 'John Smith <foo@bar.com>';
let invalidEmail1 = 'not an email';
let email3 = 'CaseSensitive@email.com'
let email4 = 'Testa.Testing@Gmail.com'

@suite class EmailAddressTest {
    @test isEmailAddress() {
        E.isEmailAddressString.assert(email1);
        E.isEmailAddressString.assert(email2);
        expectError(E.isEmailAddressString.validate(invalidEmail1))
    }

    @test convertEmailAddress() {
        let result1 = E.isEmailAddress.convert(email1);
        assert.equal(null, result1.name);
        assert.equal('foo@bar.com', result1.address);
        assert.equal('foo', result1.localPart);
        assert.equal('bar.com', result1.domain);

        let result2 = E.isEmailAddress.convert(email2);
        assert.equal('John Smith', result2.name);
        assert.equal('foo@bar.com', result2.address);
        assert.equal('foo', result2.localPart);
        assert.equal('bar.com', result2.domain);
    }

    @test canNormalizeEmailAddress() {
        let result1 = E.isEmailAddress.convert(email3)
        assert.equal(result1.normalize(), email3.toLowerCase())
        let result2 = E.isEmailAddress.convert(email4)
        assert.equal(result2.normalize(), 'testatesting@gmail.com')
    }
}
