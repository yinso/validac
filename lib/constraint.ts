import * as B from './base';

// the key is to determine how to write out constraints.
export interface ConstraintResult<T> {
    readonly isValid : boolean;
    getResult() : T;
    getErrors() : B.ValidationError[];
}

export function Success<T>(v : T) : ConstraintResult<T> {
    return {
        isValid : true,
        getResult: () => v,
        getErrors: () => []
    }
}

export function Failure<T>(error : B.ValidationError | B.ValidationError[]) : ConstraintResult<T> {
    return {
        isValid: false,
        getResult: () => {
            throw new Error(`InvalidResult`)
        },
        getErrors: () => error instanceof Array ? error : [ error ]
    }
}

function reduceSuccess<T>(results : ConstraintResult<T>[]) : ConstraintResult<T> {
    // what are we returning?
    // all of them would have the same value if they are the same thing!
    let isValid : boolean = false;
    let count : number = -1;
    let errors : B.ValidationError[] = [];
    results.forEach((res, i) => {
        if (res.isValid) {
            isValid = true;
            count = i;
        } else {
            errors = errors.concat(res.getErrors());
        }
    });
    if (isValid) {
        return Success(results[count].getResult());
    } else {
        return Failure(errors);
    }
}

function reduceErrors<T>(results : ConstraintResult<T>[]) : B.ValidationError[] {
    // all of them would have the same value if they are the same thing!
    let errors : B.ValidationError[] = [];
    results.forEach((res) => {
        if (!res.isValid) {
            errors = errors.concat(res.getErrors());
        }
    });
    return errors;
}

export interface Constraint<T> {
    validate(v : T, path : string) : ConstraintResult<T>;
    and(constraint : Constraint<T>) : Constraint<T>;
    or(constraint: Constraint<T>) : Constraint<T>;
    not() : Constraint<T>;
}

export abstract class BaseConstraint<T> implements Constraint<T> {
    abstract validate(v : T, path: string) : ConstraintResult<T>;

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

    validate(v : T, path: string) : ConstraintResult<T> {
        let errors = reduceErrors(this.constraints.map((constraint) => constraint.validate(v, path)));
        if (errors.length > 0) {
            return Failure(errors);
        } else {
            return Success(v);
        }
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

    validate(v : T, path: string) : ConstraintResult<T> {
        // in this case - we are trying to capture the fact that there aren't all errors...
        return reduceSuccess(this.constraints.map((constraint) => constraint.validate(v, path)));
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

    validate(v : T, path : string) : ConstraintResult<T> {
        let result = this.constraint.validate(v, path);
        if (result.isValid) {
            return Failure({
                error: 'NotConstraint',
                constraint: {
                    inner: this.constraint
                },
                path: path,
                actual: v
            } as any as B.ValidationError);
        } else {
            return Success(v);
        }
    }

    not() : Constraint<T> {
        return this.constraint;
    }
}

export function not<T>(constraint : Constraint<T>) : Constraint<T> {
    return new NotConstraint(constraint);
}

export type ConstraintPredicate<T> = (v : T) => boolean;

class PredicateConstraint<T> extends BaseConstraint<T> {
    readonly predicate : ConstraintPredicate<T>;
    constructor(predicate : ConstraintPredicate<T>) {
        super();
        this.predicate = predicate;
    }

    validate(v : T, path : string) : ConstraintResult<T> {
        if (this.predicate(v)) {
            return Success(v);
        } else {
            return Failure({
                error: 'PredicateError',
                constraint: {
                    predicate: this.predicate
                },
                path: path,
                actual: v
            } as any as B.ValidationError);
        }
    }
}

export function pass<T>(predicate : ConstraintPredicate<T>) : Constraint<T> {
    return new PredicateConstraint<T>(predicate);
}
