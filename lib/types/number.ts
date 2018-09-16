import { isa } from '../isa';
import { isString , match } from './string';

declare global {
    interface NumberConstructor {
        isNumber (v : any) : v is number;
    }
}

Number.isNumber = (value : any) : value is number => typeof(value) === 'number';

export let isNumber = isa(Number.isNumber, 'number');

isNumber.appendConvert(isString
    .where(match(/^[+-]?\d+(\.\d+)?$/))
    .transform((v: string) => parseFloat(v)))

export let convertNumber = isNumber.toConvert()
