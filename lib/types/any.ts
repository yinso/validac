import { ExplicitAny , IsaValidator } from '../base';
import {  isa } from '../isa';

export let isAny : IsaValidator<ExplicitAny> = isa((arg : ExplicitAny) : arg is ExplicitAny => true, 'Any')

export let convertAny = isAny.toConvert();

isAny.toConvert = function () { return convertAny }
