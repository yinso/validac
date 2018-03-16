import { IValidator, IValidationResult } from './base';

export type IsaPredicate<T> = (value : any) => value is T;

// we probably want to create constraint structures as well..!!!
//export type Constraint<T> = (value : T) => boolean;

export class IsaValidator<T> implements IValidator<T> {
    readonly isa : IsaPredicate<T>;
    readonly type : string;
    constructor(isa : IsaPredicate<T>, type : string) {
        this.isa = isa;
        this.type = type;
    }

    validate(value : any, path : string = '$') : IValidationResult<T> {
        if (this.isa(value)) {
            return Promise.resolve<T>(value);
        } else {
            return Promise.reject<T>([{
                error: 'TypeError',
                path: path,
                actual: value
            }]);
        }
    }
}

export function isa<T>(pred : IsaPredicate<T>, type : string) {
    return new IsaValidator<T>(pred, type);
}
