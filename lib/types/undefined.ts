import { isa } from '../combinators/isa';

export let isUndefined = isa((value : any) : value is undefined => value === undefined, 'undefined');
