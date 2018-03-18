import { isa } from '../validator';

export let isNull = isa((value : any) : value is null => value === null, 'null');
