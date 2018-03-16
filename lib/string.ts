import { isa } from './isa';
import { isLiteral } from './literal';

export let isString = isa((value : any) : value is string => typeof(value) === 'string', 'string');

export function isStringLiteral<T extends string>(value : T) {
    return isLiteral<string, T>(value);
}
