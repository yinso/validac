import { isa , isLiteral } from '../validator';

export let isBoolean = isa((value : any) : value is boolean => typeof(value) === 'boolean', 'boolean');

export let isTrue = isLiteral<true>(true);

export let isFalse = isLiteral<false>(false);
