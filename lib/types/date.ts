import { isa, Validator } from '../validator';
import { isString } from './string';
import { match } from './string';

export let isDate = isa((v) : v is Date => v instanceof Date, 'Date');

export let convertDate = isString
    .where(match(/^\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d)?Z?$/))
    .transform((v) => new Date(v))
