class BaseValidator {

    where(constraint) {
        return new ConstraintValidator(this, constraint);
    }

    to(transform) {
        return new ThenValidator(this, new TransformValidator(transform));
    }

    and(validator) {
        return new AndValidator(this, validator);
    }

    or(validator) {
        return new OrValidator(this, validator);
    }

    then(validator) {
        return new ThenValidator(this, validator);
    }
}

export let isAny = new BaseValidator();

class IsaValidator extends BaseValidator {
    constructor(isa) {
        super();
        this.isa = isa;
    }

    validate(v , path = '$') {
        if (this.isa(v)) {
            return Promise.resolve(v);
        } else {
            return Promise.reject({
                error: 'TypeError',
                path: path,
                actual: v
            });
        }
    }
}

export function isa(proc) {
    return new IsaValidator(proc);
}

class ConstraintValidator extends BaseValidator {
    constructor(constraint) {
        super();
        this.constraint = constraint;
    }

    validate(v, path = '$') {
        // constraints are basically sync validation?
        let errors = this.constraint.validate(v, path);
        if (errors.length > 0) {
            return Promise.reject(errors);
        }
        return Promise.resolve(v);
    }
}

class TransformValidator extends BaseValidator {
    constructor(transform) {
        super();
        this.transform = transform;
    }

    validate(v, path = '$') {
        return new Promise((resolve, reject) => {
            try {
                resolve(transform(v));
            } catch (e) {
                reject(e);
            }
        })
    }
}

class ThenValidator extends BaseValidator {
    constructor(step1, step2) {
        super();
        this.step1 = step1;
        this.step2 = step2;
    }

    validate(v, path = '$') {
        return this.step1.validate(v, path)
            .then((v1) => {
                return this.step2.validate(v1, path);
            })
    }
}

// this one can be a bit difficult to think of... I think it's basically the same as the ThenValidator...
class AndValidator extends BaseValidator {
    constructor(inner, ...inners) {
        super();
        this.validators = [ inner ].concat(inners);
    }

    validate(v, path = '$') {
        let first = this.validators[0];
        let rest = this.validators.slice(1);
        rest.forEach((next) => {
            first = new ThenValidator(first, next);
        })
        return first.validate(v, path);
    }

    and(validator) {
        return new AndValidator(this.validators.concat([validator]));
    }
}

class OrValidator extends BaseValidator {
    constructor(...validators) {
        this.validators = validators;
    }

    validate(value, path = '$') {
        return new Promise((resolve, reject) => {
            var result, errors = [], isValidated = false;
            Promise.all(this.validators.map((validator) => {
                validator.validate(value, path)
                    .then((res) => {
                        result = res;
                        isValidated = true;
                    })
                    .catch((errs) => {
                        errors = errors.concat(errs);
                    })
            }))
                .then((_) => {
                    if (isValidated)
                        return resolve(result)
                    else
                        return reject(errors); 
                })
        })
    }

    or(validator) {
        return new OrValidator(this.validators.concat([validator]));
    }
}