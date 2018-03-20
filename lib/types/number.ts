import { isa , isLiteral } from '../validator';
import { isString , match } from './string';

export let isNumber = isa((value : any) : value is number => typeof(value) === 'number', 'number');

export let parseNumber = isString
    .where(match(/^[+-]?\d+(\.\d+)$/))
    .transform((v: string) => parseFloat(v));
    