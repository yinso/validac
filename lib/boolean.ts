import { isa } from './isa';
import { isLiteral } from './literal';

export let isBoolean = isa((value : any) : value is boolean => typeof(value) === 'boolean', 'boolean');

export let isTrue = isLiteral<boolean, true>(true);

export let isFalse = isLiteral<boolean, false>(false);
