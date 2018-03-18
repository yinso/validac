import { isa } from '../validator';

export let isUndefined = isa((value : any) : value is undefined => value === undefined, 'undefined');
