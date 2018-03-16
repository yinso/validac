import { isa } from './isa';

export let isUndefined = isa((value : any) : value is undefined => value === undefined, 'undefined');
