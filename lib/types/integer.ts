import { Scalar } from '../scalar';
import { isa } from '../isa';
import { isNumber } from './number';
import { isString , match } from './string';

export class Integer extends Scalar<number> {
    static isInteger(v : any) : v is Integer {
        return v instanceof Integer;
    }

    static fromJSON(v : any, path : string = '$') {
        return isInteger.convert(v, path);
    }

    static convertIntegerString = isString
        .where(match(/^[+-]?\d+$/))
        .transform((v) => new Integer(parseInt(v)))

    static convertIntegerNumber = isNumber
            .where((v : number) => Math.floor(v) === v)
            .transform((v) => new Integer(v))
}

// the following are needed for scalar object.
// 1) the basic "type check" -> this is the "instanceof method"
// 2) the isaValidator over the typecheck.
// 3) the isaValidator over the scalar options.
// 4) the convertValidator that wraps around both of the isaValidators.
export let isInteger = isa(Integer.isInteger, 'Integer')

isInteger.appendConvert(Integer.convertIntegerNumber)

isInteger.appendConvert(Integer.convertIntegerString)
