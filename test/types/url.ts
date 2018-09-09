import * as assert from 'assert';
import * as S from '../../lib/types/string';
import * as U from '../../lib/types/url';
import { suite, test, slow, timeout , expectError } from '../../lib/util/test-util';
import { ValidationResult } from '../../lib';

// constraint should also be a combinator thing!!!
@suite class UrlTest {
    @test isUrl() {
        U.isUrl.assert('http://test')
        U.isUrl.assert('https://test:203')
        expectError(U.isUrl.validate('test'))
    }

    @test parseUrl() {
        let result = U.parseUrl.assert('http://user:pass@host:8080/path1/path2?foo=test&bar=xyz')
        assert.equal('http:', result.protocol)
        assert.equal('user', result.username)
        assert.equal('pass', result.password)
        assert.equal('host:8080', result.host)
        assert.equal('host', result.hostname)
        assert.equal('/path1/path2', result.pathname)
        assert.equal(8080, result.port)
    }
}
