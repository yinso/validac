import { ValidationError } from '../base';
import { BaseConstraint , Success, Failure, ConstraintResult } from '../constraint';
import { isa , isLiteral } from '../validator';

export let isString = isa((value : any) : value is string => typeof(value) === 'string', 'string');

class MatchConstraint extends BaseConstraint<string> {
    readonly pattern : RegExp;
    constructor(pattern : RegExp) {
        super();
        this.pattern = pattern;
    }

    validate(v : string, path : string) : ConstraintResult<string> {
        if (this.pattern.test(v)) {
            return Success(v);
        } else {
            return Failure({
                error: 'MatchConstraint',
                constraint: {
                    pattern: this.pattern
                },
                path: path,
                actual: v
            } as any as ValidationError)
        }
    }
}

export function match(pattern : RegExp) {
    return new MatchConstraint(pattern);
}

class MinLengthConstraint extends BaseConstraint<string> {
    readonly minLength: number;
    readonly inclusive : boolean;
    constructor(minLength : number, inclusive : boolean = false) {
        super();
        this.minLength = minLength;
        this.inclusive = inclusive;
    }

    satisfy(v : string) {
        return this.inclusive ? v.length >= this.minLength : v.length > this.minLength;
    }

    validate(v : string, path : string) : ConstraintResult<string> {
        if (this.satisfy(v)) {
            return Success(v);
        } else {
            return Failure({
                error: 'MinLengthConstraint',
                constraint: {
                    minLength: this.minLength,
                    minLengthInclusive : this.inclusive
                },
                path: path,
                actual: v
            } as any as ValidationError);
        }
    }
}

export function minLength(minLength: number, inclusive: true) {
    return new MinLengthConstraint(minLength, inclusive);
}

class MaxLengthConstraint extends BaseConstraint<string> {
    readonly maxLength: number;
    readonly inclusive : boolean;
    constructor(maxLength : number, inclusive : boolean = false) {
        super();
        this.maxLength = maxLength;
        this.inclusive = inclusive;
    }

    satisfy(v : string) {
        return this.inclusive ? v.length <= this.maxLength : v.length < this.maxLength;
    }

    validate(v : string, path : string) : ConstraintResult<string> {
        if (this.satisfy(v)) {
            return Success(v);
        } else {
            return Failure({
                error: 'MaxLengthConstraint',
                constraint: {
                    maxLength: this.maxLength,
                    maxLengthInclusive : this.inclusive
                },
                path: path,
                actual: v
            } as any as ValidationError);
        }
    }
}

export function maxLength(minLength: number, inclusive: true) {
    return new MaxLengthConstraint(minLength, inclusive);
}
