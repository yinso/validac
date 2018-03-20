import { ValidationError } from '../base';
import { BaseConstraint } from '../constraint';
import { isa , isLiteral } from '../validator';

export let isString = isa((value : any) : value is string => typeof(value) === 'string', 'string');

class MatchConstraint extends BaseConstraint<string> {
    readonly pattern : RegExp;
    constructor(pattern : RegExp) {
        super();
        this.pattern = pattern;
    }

    satisfy(v : string, path : string) : ValidationError[] {
        if (this.pattern.test(v)) {
            return [];
        } else {
            return [{
                error: 'MatchConstraint',
                expected: {
                    pattern: this.pattern
                },
                path: path,
                actual: v
            }];
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

    _satisfy(v : string) {
        return this.inclusive ? v.length >= this.minLength : v.length > this.minLength;
    }

    satisfy(v : string, path : string) : ValidationError[] {
        if (this._satisfy(v)) {
            return [];
        } else {
            return [{
                error: 'MinLengthConstraint',
                expected: {
                    minLength: this.minLength,
                    minLengthInclusive : this.inclusive
                },
                path: path,
                actual: v
            }];
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

    _satisfy(v : string) {
        return this.inclusive ? v.length <= this.maxLength : v.length < this.maxLength;
    }

    satisfy(v : string, path : string) : ValidationError[] {
        if (this._satisfy(v)) {
            return [];
        } else {
            return [{
                error: 'MaxLengthConstraint',
                expected: {
                    maxLength: this.maxLength,
                    maxLengthInclusive : this.inclusive
                },
                path: path,
                actual: v
            }];
        }
    }
}

export function maxLength(minLength: number, inclusive: true) {
    return new MaxLengthConstraint(minLength, inclusive);
}
