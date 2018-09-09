import { Scalar } from '../scalar';
import { isa } from '../isa';
import { isNumber } from './number';
import { isString , match } from './string';

export class Integer extends Scalar<number> {
    static isInteger(v : any) : v is Integer {
        return v instanceof Integer;
    }

    static fromJSON(v : any, path : string = '$') {
        return Integer.convertInteger.assert(v, path);
    }

    static convertInteger = isString
        .where(match(/^[+-]?\d+$/))
        .transform((v) => new Integer(parseInt(v)))
        .union(isNumber
            .where((v : number) => Math.floor(v) === v)
            .transform((v) => new Integer(v))
        )
}

export let isInteger = isa(Integer.isInteger, 'isInteger')

export let convertInteger = Integer.convertInteger;
