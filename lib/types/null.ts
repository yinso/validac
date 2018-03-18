import { isa } from '../combinators/isa';

export let isNull = isa((value : any) : value is null => value === null, 'null');
