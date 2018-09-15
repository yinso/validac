import { ExplicitAny , IsaValidator } from '../base';
import {  isa } from '../isa';

export let isAny : IsaValidator<any> = isa((arg : ExplicitAny) : arg is any => true, 'Any')

export let convertAny = isAny.toConvert();

isAny.toConvert = function () { return convertAny }
