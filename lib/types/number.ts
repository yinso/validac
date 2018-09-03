import { isa , isLiteral } from '../validator';
import { isString , match } from './string';

declare global {
    interface NumberConstructor {
        isNumber (v : any) : v is number;
    }
}

Number.isNumber = (value : any) : value is number => typeof(value) === 'number';

export let isNumber = isa(Number.isNumber, 'number');

export let parseNumber = isString
    .where(match(/^[+-]?\d+(\.\d+)?$/))
    .transform((v: string) => parseFloat(v));
