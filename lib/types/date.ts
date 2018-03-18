import { isa } from '../combinators/isa';

export let isDate = isa((value : any) : value is Date => value instanceof Date, 'date');
