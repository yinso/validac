const C = require('./constraint');

function BaseValidator() { }

BaseValidator.prototype.where = function where(constraint) {
    if (constraint instanceof C.BaseConstraint) {
        return this.then(new ConstraintValidator(constraint));
    } else {
        return this.then(new ConstraintValidator(C.pass(constraint)));
    }
}

BaseValidator.prototype.to = function to(transform) {
    return this.then(new TransformValidator(transform));
}

BaseValidator.prototype.and = function and (validator) {
    return new AndValidator([this, validator]);
}

BaseValidator.prototype.or = function or(validator) {
    return new OrValidator([this, validator]);
}

BaseValidator.prototype.then = function then(validator) {
    return new ThenValidator(this, validator);
}

BaseValidator.prototype.isOptional = function isOptional() {
    let validator = isUndefined.or(this);
    Object.defineProperty(validator, '_isOptional', { // this property is a hook for the object validator.
        configurable: false,
        writable: false,
        enumerable: false,
        value: true
    })
    return validator;
}

BaseValidator.prototype.defaultTo = function defaultTo(defaultProc) {
    return new DefaultValidator(defaultProc);
}

function IsaValidator(isa, typeName) {
    BaseValidator.call(this);
    this.isa = isa;
    this.typeName = typeName;
}

IsaValidator.prototype = new BaseValidator();

IsaValidator.prototype.validate = function validate(v , path = '$') {
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

function isa(proc, typeName) {
    return new IsaValidator(proc, typeName);
}

let isAny = isa((v) => v === undefined || v === null || v === '' || v === false || v === 0 || !!v, 'any');

function isLiteral(typeName) {
    return new IsaValidator((v) => v === typeName, typeName);
}

function isEnum(...typeNames) {
    return new OrValidator(typeNames.map(isLiteral));
}

const isNull = isLiteral(null);

const isUndefined = isLiteral(undefined);

function ConstraintValidator(constraint) {
    BaseValidator.call(this);
    this.constraint = constraint;
}

ConstraintValidator.prototype = new BaseValidator();

ConstraintValidator.prototype.validate = function validate(v, path = '$') {
    let errors = this.constraint.satisfy(v, path);
    if (errors.length > 0) {
        return Promise.reject(errors);
    } else {
        return Promise.resolve(v);
    }
}

function TransformValidator(transform) {
    BaseValidator.call(this);
    this.transform = transform;
}

TransformValidator.prototype = new BaseValidator();

TransformValidator.prototype.validate = function validate(v, path = '$') {
    return new Promise((resolve, reject) => {
        try {
            resolve(this.transform(v));
        } catch (e) {
            reject(e);
        }
    })
}

function AsyncValidator(asyncCall) {
    BaseValidator.call(this);
    this.asyncCall = asyncCall;
}

AsyncValidator.prototype = new BaseValidator();

AsyncValidator.prototype.validate = function validate(value) {
    return this.asyncCall(value);
}

function byAsync(asyncCall) {
    return new AsyncValidator(asyncCall);
}

function ThenValidator(step1, step2) {
    BaseValidator.call(this);
    this.step1 = step1;
    this.step2 = step2;
}

ThenValidator.prototype = new BaseValidator();

ThenValidator.prototype.validate = function validate(v, path = '$') {
    return this.step1.validate(v, path)
        .then((v1) => {
            return this.step2.validate(v1, path);
        })
}

// this one can be a bit difficult to think of... I think it's basically the same as the ThenValidator...
function AndValidator(inners) {
    BaseValidator.call(this);
    if (inners.length == 0)
        throw new Error(`AndValidator.zeroValidators`);
    this.validators = inners;
}

AndValidator.prototype = new BaseValidator();

AndValidator.prototype.validate = function validate(v, path = '$') {
    let first = this.validators[0];
    let rest = this.validators.slice(1);
    rest.forEach((next) => {
        first = new ThenValidator(first, next);
    })
    return first.validate(v, path);
}

AndValidator.prototype.and = function and(validator) {
    return new AndValidator(this.validators.concat([validator]));
}

function OrValidator(validators) {
    BaseValidator.call(this);
    this.validators = validators;
}

OrValidator.prototype = new BaseValidator();

OrValidator.prototype.validate = function validate(value, path = '$') {
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

OrValidator.prototype.or = function or(validator) {
    return new OrValidator(this.validators.concat([validator]));
}

function DefaultValidator(defaultProc) {
    BaseValidator.call(this);
    this.defaultProc = defaultProc;
}

DefaultValidator.prototype = new BaseValidator();

DefaultValidator.prototype.validate = function validate(v, path) {
    return new Promise((resolve, reject) => {
        try {
            resolve(this.defaultProc());
        } catch (e) {
            reject([{
                error: 'Default',
                expected: 'success',
                path: path,
                actual: v
            }]);
        }
    })
}

exports = module.exports = {
    BaseValidator : BaseValidator,
    isAny: isAny,
    isa: isa,
    isLiteral: isLiteral,
    isEnum: isEnum,
    isUndefined: isUndefined,
    isNull: isNull,
    byAsync: byAsync,
};
