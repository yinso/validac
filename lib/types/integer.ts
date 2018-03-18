import { Scalar } from '../scalar';
import { isa } from '../validator';
import { isNumber } from './number';
import { isString , match } from './string';

export class Integer extends Scalar<number> {

}

export let isInteger = isNumber
    .where((v : number) => Math.floor(v) === v)
    .to((v) => new Integer(v));

export let parseInteger = isString
    .where(match(/^[+-]?\d+$/))
    .to((v) => new Integer(parseInt(v)));
