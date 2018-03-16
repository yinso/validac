import { isa } from './isa';
import { isLiteral } from './literal';
import { chain } from './sequence';
import { isString } from './string';
import { transform } from './transform';

export let isNumber = isa((value : any) : value is number => typeof(value) === 'number', 'number');

export let parseNumber = chain(isString,
    isa((v : string) : v is string => /^[+-]?\d+(\.\d+)$/.test(v), 'number'),
    transform((v : string) => parseFloat(v)));

export function isNumberLiteral<T extends number>(value : T) {
    return isLiteral<number, T>(value);
}
    