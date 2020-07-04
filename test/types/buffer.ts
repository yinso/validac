import { suite, test } from 'mocha-typescript';
import * as assert from 'assert';
import { isBase64Regex, isBuffer } from '../../lib/types/buffer';

const testCases = [
    {
        input: 'test',
        expected: true
    },
    {
        input: 'this is a test string',
        expected: true
    }
]

describe('isBase64Test', () => {
    testCases.forEach(({input, expected}) => {
        it(`canTestBase64String ${input}`, () => {
            const base64 = Buffer.from(input).toString('base64');
            assert.equal(isBase64Regex.test(base64), expected);
        })
    })
})

describe('isBufferTest', () => {
    testCases.forEach(({input, expected}) => {
        it(`canTestIsBuffer ${input}`, () => {
            const buffer = Buffer.from(input);
            assert.equal(isBuffer.isa(buffer), expected)
        })
    })    
})

const convertTestCases = [
    {
        input: {
            type: 'Buffer',
            data: []
        },
        expected: Buffer.from('')
    },
    {
        input: {
            type: 'Buffer',
            data: [ 116, 101, 115, 116 ]
        },
        expected: Buffer.from('test')
    },
    {
        input: 'dGVzdA==',
        expected: Buffer.from('test')
    },
]

describe(`convertBufferTest`, () => {
    convertTestCases.forEach(({input, expected}) => {
        it(`canConvertFrom: ${input}`, () => {
            const result = isBuffer.convert(input);
            assert.equal(result instanceof Buffer, true);
            assert.ok(result.equals(expected));
        })
    })
})
