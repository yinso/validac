import { isa } from '../isa';
import { isLiteral } from './literal';
import { isString, match } from './string';

export let isBoolean = isa((value : any) : value is boolean => typeof(value) === 'boolean', 'boolean');

export let isTrue = isLiteral<true>(true);

export let isFalse = isLiteral<false>(false);

export let convertTrue =
    isTrue.union(isString.where(match(/^true$/i))).transform<true>(() => true)

export let convertFalse =
    isFalse.union(isString.where(match(/^false$/i))).transform<false>((v) => false)

export let convertBoolean = convertTrue.union(convertFalse)

isBoolean.toConvert = function () { return convertBoolean }

isTrue.toConvert = function () { return convertTrue }

isFalse.toConvert = function () { return convertFalse }
