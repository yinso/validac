const C = require('./constraint');

class BaseValidator {

    where(constraint) {
        if (constraint instanceof C.BaseConstraint) {
            return this.then(new ConstraintValidator(constraint));
        } else {
            return this.then(new ConstraintValidator(C.pass(constraint)));
        }
    }

    to(transform) {
        return this.then(new TransformValidator(transform));
    }

    and (validator) {
        return new AndValidator(this, validator);
    }

    or(validator) {
        return new OrValidator(this, validator);
    }

    then(validator) {
        return new ThenValidator(this, validator);
    }
}

let isAny = new BaseValidator();

class IsaValidator extends BaseValidator {
    constructor(isa, typeName) {
        super();
        this.isa = isa;
        this.typeName = typeName;
    }

    validate(v , path = '$') {
        if (this.isa(v)) {
            return Promise.resolve(v);
        } else {
            return Promise.reject({
                error: 'TypeError',
                type: this.typeName,
                path: path,
                actual: v
            });
        }
    }
}

function isa(proc, typeName) {
    return new IsaValidator(proc, typeName);
}

function isLiteral(typeName) {
    return new IsaValidator((v) => v === typeName, typeName);
}

function isEnum(...typeNames) {
    return new OrValidator(...typeNames.map(isLiteral));
}

class ConstraintValidator extends BaseValidator {
    constructor(constraint) {
        super();
        this.constraint = constraint;
    }

    validate(v, path = '$') {
        // constraints are basically sync validation?
        let result = this.constraint.validate(v, path);
        if (!result.isValid) {
            return Promise.reject(result.getErrors());
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
                resolve(this.transform(v));
            } catch (e) {
                reject(e);
            }
        })
    }
}

class AsyncValidator extends BaseValidator {
    constructor(asyncCall) {
        super();
        this.asyncCall = asyncCall;
    }
    validate(value) {
        return this.asyncCall(value);
    }
}

function byAsync(asyncCall) {
    return new AsyncValidator(asyncCall);
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

exports = module.exports = {
    BaseValidator : BaseValidator,
    isAny: isAny,
    isa: isa,
    isLiteral: isLiteral,
    isEnum: isEnum,
    byAsync: byAsync,
};
