import { isLiteral } from './literal';

export const isUndefined = isLiteral(undefined, 'undefined');
