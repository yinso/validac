import { isLiteral } from './literal';

export const isNull = isLiteral(null, 'null');

export const convertNull = isNull.toConvert();

isNull.toConvert = () => convertNull
