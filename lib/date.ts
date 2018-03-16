import { isa } from './isa';

export let isDate = isa((value : any) : value is Date => value instanceof Date, 'date');
