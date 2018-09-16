import { isa } from '../isa';
import { isString } from './string';
import { match } from './string';

export let isDate = isa((v) : v is Date => v instanceof Date, 'Date');

isDate.appendConvert(isString
    .where(match(/^\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d(\.\d\d\d)?)?(Z|([+-]\d\d:\d\d))?$/))
    .transform((v) => new Date(v)))

export let convertDate = isDate.toConvert()
