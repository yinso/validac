import { IsaValidator , isa } from '../isa';
import { ExplicitAny } from '../base';

export let isAny : IsaValidator<any> = isa((arg : ExplicitAny) : arg is any => true, 'Any')

export let convertAny = isAny.toConvert();
