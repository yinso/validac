import { isa , isLiteral } from '../validator';
import { isString, match } from './string';

export let isBoolean = isa((value : any) : value is boolean => typeof(value) === 'boolean', 'boolean');

export let isTrue = isLiteral<true>(true);

export let isFalse = isLiteral<false>(false);

export let parseTrue =
    isTrue
    .union(isString.where(match(/^true$/i)).transform((v) => true))

export let parseFalse =
    isFalse
    .union(isString.where(match(/^false$/i)).transform((v) => false))

export let parseBoolean = parseTrue.union(parseFalse)
