import { isLiteral } from './literal';

export const isUndefined = isLiteral(undefined, 'undefined');

export const convertUndefined = isUndefined.toConvert();
