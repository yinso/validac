/**
 * CreditCard
 */
import valid = require('card-validator')
import { Scalar } from '../scalar'
import { isString } from './string'
import { isa } from '../isa'

export const isCreditCardNumberString = isString
    .where((v) => {
        const isValid = valid.number(v)
        return isValid.isValid
    })

export class CreditCardNumber extends Scalar<string> {
    readonly type: string;
    readonly codeLength: number;
    constructor(inner: string) {
        super(isCreditCardNumberString.convert(inner))
        const isValid = valid.number(inner)
        if (isValid.card) {
            this.type = isValid.card.type
            this.codeLength = isValid.card.code.size
        } else {
            throw new Error(`InvalidCreditCardNumber:${inner}`)
        }
    }
}



