import type { ValidationError , BaseValidator, ExplicitAny, ValidationResult , Constraint, ConstraintPredicate } from './base';
import { isConstraint } from './_isa'; 

/**
 * Constraint is a limited type of validation that basically deal with the following question.
 * 
 * Does the value sastifies the constraint?
 * 
 * i.e. The main signature for constraint is as follows:
 * 
 * (v : T) => boolean;
 * 
 * Unlike the general validation, constraints cannot be used to perform transformtion (use the transform vaildator for that purpose).
 * 
 * 
 */
function reduceSuccess<T>(results : ValidationError[][]) : ValidationError[] {
    // what are we returning?
    // all of them would have the same value if they are the same thing!
    let isValid : boolean = false;
    let count : number = -1;
    let errors : ValidationError[] = [];
    results.forEach((res, i) => {
        if (res.length == 0) {
            isValid = true;
            count = i;
        } else {
            errors = errors.concat(res);
        }
    });
    if (isValid) {
        return [];
    } else {
        return errors;
    }
}

function reduceErrors<T>(results : ValidationError[][]) : ValidationError[] {
    return results.reduce((acc, res) => {
        return acc.concat(res);
    }, [] as ValidationError[]);
}

// this is the highest level combinator.
// and or not.
export abstract class BaseConstraint<T> implements Constraint<T> {
    abstract satisfy(v : T, path: string) : ValidationError[];

    and(constraint : Constraint<T>) : Constraint<T> {
        return new AndConstraint(this, constraint);
    }
    or(constraint : Constraint<T>) : Constraint<T> {
        return new OrConstraint(this, constraint);
    }
    not() : Constraint<T> {
        return new NotConstraint<T>(this);
    }
}

class AndConstraint<T> extends BaseConstraint<T> {
    readonly constraints : Constraint<T>[];
    constructor(...constraints : Constraint<T>[]) {
        super();
        this.constraints = constraints;
    }

    satisfy(v : T, path: string) : ValidationError[] {
        return reduceErrors(this.constraints.map((constraint) => constraint.satisfy(v, path)));
    }

    and(constraint : Constraint<T>) {
        return new AndConstraint(...this.constraints, constraint);
    }
}

class OrConstraint<T> extends BaseConstraint<T> {
    readonly constraints : Constraint<T>[];
    constructor(...constraints : Constraint<T>[]) {
        super();
        this.constraints = constraints;
    }

    satisfy(v : T, path: string) : ValidationError[] {
        return reduceSuccess(this.constraints.map((constraint) => constraint.satisfy(v, path)));
    }

    or(constraint : Constraint<T>) {
        return new OrConstraint(...this.constraints, constraint);
    }
}

class NotConstraint<T> extends BaseConstraint<T> {
    readonly constraint : Constraint<T>;
    constructor(constraint : Constraint<T>) {
        super();
        this.constraint = constraint;
    }

    satisfy(v : T, path : string) : ValidationError[] {
        let result = this.constraint.satisfy(v, path);
        if (result.length == 0) {
            return [{
                error: 'NotConstraint',
                expected: {
                    inner: this.constraint
                },
                path: path,
                actual: v
            }]
        } else {
            return [];
        }
    }

    not() : Constraint<T> {
        return this.constraint;
    }
}

export function not<T>(constraint : Constraint<T>) : Constraint<T> {
    return new NotConstraint(constraint);
}

class PredicateConstraint<T> extends BaseConstraint<T> {
    readonly predicate : ConstraintPredicate<T>;
    constructor(predicate : ConstraintPredicate<T>) {
        super();
        this.predicate = predicate;
    }

    satisfy(v : T, path : string) : ValidationError[] {
        if (this.predicate(v)) {
            return [];
        } else {
            return [{
                error: 'PredicateError',
                expected: {
                    predicate: this.predicate
                },
                path: path,
                actual: v
            }];
        }
    }
}

export function pass<T>(predicate : ConstraintPredicate<T>) : Constraint<T> {
    return new PredicateConstraint<T>(predicate);
}
