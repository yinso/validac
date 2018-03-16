import { IValidator , IValidationResult } from './base';

type ConstraintPredicate<T> = (value : T) => boolean;

// constraint validator doesn't change the type!
class ConstraintValidator<T> implements IValidator<T, T> {
    readonly constraint : ConstraintPredicate<T>;
    constructor(constraint : ConstraintPredicate<T>) {
        this.constraint = constraint;
    }

    validate( value : T , path : string = '$') : IValidationResult<T> {
        if (this.constraint(value))
            return Promise.resolve<T>(value);
        else
            return Promise.reject<T>([{
                error: 'ContraintError', // need actual constraint error - to make it customizable.
                path: path,
                actual: value
            }]);
    }
}

class PatternConstraintValidator extends ConstraintValidator<string> {
    readonly pattern : RegExp;
    constructor(pattern : RegExp) {
        super((value : string) => pattern.test(value));
    }
}

function withPattern(pattern : RegExp) {
    return new PatternConstraintValidator(pattern);
}
