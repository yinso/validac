import { Scalar } from './scalar';
import { chain } from './sequence';
import { isa } from './isa';
import { isNumber } from './number';
import { isString } from './string';
import { transform } from './transform';

export class Integer extends Scalar<number> {

}

export let isInteger = chain(isNumber, isa((v : number) : v is number => Math.floor(v) === v, 'integer'), transform((v : number) => new Integer(v)));

export let parseInteger = chain(isString, isa((v: string) : v is string => /^[+-]?\d+$/.test(v), 'integer'), transform((v : string) => new Integer(parseInt(v))));
