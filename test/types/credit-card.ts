import { suite, test } from 'mocha-typescript'
import * as C from '../../lib/types/credit-card'
import * as assert from 'assert'

const cards = [
    {
        card: '4012888888881881',
        type: 'visa',
        valid: true,
    },
    {
        card: '4111111111111111',
        type: 'visa',
        valid: true,
    },
    {
        card: '62123456789002',
        type: 'unionpay',
        valid: true,
    },
    {
        card: '6011000990139424',
        type: 'discover',
        valid: true,
    },
    {
        card: '378282246310005',
        type: 'american-express',
        valid: true,
    },
]

describe('CreditCardTest', () => {
    cards.forEach(({ card, type , valid }) => {
        it(`canValidate ${card}`, () => {
            assert.equal(C.isCreditCardNumberString.isa(card), valid)
            if (valid) {
                const c = new C.CreditCardNumber(card)
                assert.equal(c.type, type)
            }
        })

        it(`canCreateScalar: ${card}`, () => {
            if (valid) {
                const cc = C.isCreditCardNumber.convert(card)
                assert.equal(cc instanceof C.CreditCardNumber, true)
                assert.equal(cc.type, type)
            }
        })
    })
})
