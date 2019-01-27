import * as assert from 'assert';
import * as S from '../../lib/types/string';
import * as D from '../../lib/types/domain-name';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import { ValidationResult } from '../../lib';

let domain1 = 'localhost';
let domain2 = 'foobar.com';
let invalidDomain = 'not-a-domain';

@suite class DomainNameTest {
    @test isDomainNameString() {
        D.isDomainNameString.assert(domain1);
        D.isDomainNameString.assert(domain2);
        expectError(D.isDomainNameString.validate(invalidDomain))
    }

    @test convertDomainName() {
        let result1 = D.isDomainName.convert(domain1);
        assert.equal('localhost', result1.toString());

        let result2 = D.isDomainName.convert(domain2);
        assert.equal('foobar.com', result2.toString());
    }
}
