import { isa } from '../isa';
import { isLiteral } from './literal';
import { isString, match } from './string';

export let isBoolean = isa((value : any) : value is boolean => typeof(value) === 'boolean', 'boolean');

export let isTrue = isLiteral<true>(true);

export let isFalse = isLiteral<false>(false);

let convertTrueString = isString.where(match(/^true$/i)).transform<true>(() => true)
isBoolean.appendConvert(convertTrueString)
isTrue.appendConvert(convertTrueString)

let convertFalseString = isString.where(match(/^false$/i)).transform<false>(() => false)
isFalse.appendConvert(convertFalseString)
isBoolean.appendConvert(convertFalseString)

export let convertTrue = isTrue.toConvert()

export let convertFalse = isFalse.toConvert()

export let convertBoolean = isBoolean.toConvert()
