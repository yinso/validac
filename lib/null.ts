import { isa } from './isa';

export let isNull = isa((value : any) : value is null => value === null, 'null');
