import { isa } from '../isa';
import { isString } from './string';
import { match } from './string';

export let isDate = isa((v) : v is Date => v instanceof Date, 'Date');

export let convertDate = isDate.transform((v) => v)
    .union(isString
        .where(match(/^\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d)?Z?$/))
        .transform((v) => new Date(v)))

isDate.toConvert = () => convertDate
