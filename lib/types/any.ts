import type { ExplicitAny , IsaValidator } from '../base';
import {  isa } from '../isa';

export let isAny : IsaValidator<ExplicitAny> = isa((arg : ExplicitAny) : arg is ExplicitAny => true, 'Any')
