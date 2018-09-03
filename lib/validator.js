const { ValidationResult } = require('./base');
const C = require('./constraint');

function BaseValidator() { }

BaseValidator.prototype.where = function where(constraint) {
    if (constraint instanceof C.BaseConstraint) {
        return this.transform(new ConstraintValidator(constraint));
    } else {
        return this.transform(new ConstraintValidator(C.pass(constraint)));
    }
}

function isFunction(item) {
    return item && typeof(item) === 'function';
}

function isValidator (item) {
    return !!item && isFunction(item.validate) && isFunction(item.where) && isFunction(item.transform);
}

BaseValidator.prototype.transform = function transform(transform) {
    if (isValidator(transform)) {
        return new ThenValidator(this, transform);
    } else if (isFunction(transform)) {
        return new ThenValidator(this, new TransformValidator(transform));
    } else {
        throw new Error(`InvalidTransform`);
    }
}

BaseValidator.prototype.intersect = function intersect(validator) {
    return new AndValidator([this, validator]);
}

BaseValidator.prototype.union = function union(validator) {
    return new OrValidator([this, validator]);
}

/*
BaseValidator.prototype.then = function then(validator) {
    return new ThenValidator(this, validator);
}
//*/
BaseValidator.prototype.isOptional = function isOptional() {
    let validator = isUndefined.union(this);
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

BaseValidator.prototype.assert = function (v, path) {
    let result = this.validate(v, path);
    return result.cata((item) => item)
}

BaseValidator.prototype.cast = function () { return this; }

BaseValidator.prototype.isa = function (v) {
    return this.validate(v)
        .cata((v) => true, (e) => false)
}

function IsaValidator(isa, typeName) {
    BaseValidator.call(this);
    this.isa = isa;
    this.typeName = typeName;
}

IsaValidator.prototype = new BaseValidator();

IsaValidator.prototype.validate = function validate(v , path = '$') {
    if (this.isa(v)) {
        return ValidationResult.resolve(v);
    } else {
        return ValidationResult.reject({
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
        return ValidationResult.reject(errors);
    } else {
        return ValidationResult.resolve(v);
    }
}

function TransformValidator(transform) {
    BaseValidator.call(this);
    this.transform = transform;
}

TransformValidator.prototype = new BaseValidator();

TransformValidator.prototype.validate = function validate(v, path = '$') {
    try {
        return ValidationResult.resolve(this.transform(v));
    } catch (e) {
        return ValidationResult.reject(e);
    }
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
        .cata((v1, _) => {
            return this.step2.validate(v1, path);
        }, (_, res) => res); // what does it mean that it'll throw? hmm... this doesn't compose as well!!!
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

AndValidator.prototype.intersect = function intersect(validator) {
    return new AndValidator(this.validators.concat([validator]));
}

function allOf() {
    let validators = [].slice.call(arguments)
    return new AndValidator(validators)
}

function OrValidator(validators) {
    BaseValidator.call(this);
    this.validators = validators;
}

OrValidator.prototype = new BaseValidator();

OrValidator.prototype.validate = function validate(value, path = '$') {
    // this is where we need to make it the same API?
    // do I want ValidationResult to have the same API as Promise?
    // i.e. we can contruct it where it would take a 
    // I think it wouldn't have the same API, but we need something simliar.
    // i.e. ValidationResult.all
    // ValidationResult.map
    // etc.
    return ValidationResult.oneOf(this.validators.map((validator) => validator.validate(value, path)));
}

OrValidator.prototype.union = function union(validator) {
    return new OrValidator(this.validators.concat([validator]));
}

function oneOf() {
    let validators = [].slice.call(arguments)
    return new OrValidator(validators);
}

function DefaultValidator(defaultProc) {
    BaseValidator.call(this);
    this.defaultProc = defaultProc;
}

DefaultValidator.prototype = new BaseValidator();

DefaultValidator.prototype.validate = function validate(v, path) {
    try {
        return ValidationResult.resolve(this.defaultProc());
    } catch (e) {
        return ValidationResult.reject([{
            error: 'Default',
            expected: 'success',
            path: path,
            actual: v
        }]);
    }
}
/*
function AsyncBaseValidator() { }

AsyncBaseValidator.prototype.where = function where(constraint) {
    if (constraint instanceof C.BaseConstraint) {
        return this.then(new ConstraintValidator(constraint));
    } else {
        return this.then(new ConstraintValidator(C.pass(constraint)));
    }
}

AsyncBaseValidator.prototype.to = function to(transform) {
    return this.then(new TransformValidator(transform));
}

AsyncBaseValidator.prototype.intersect = function intersect(validator) {
    return new AndValidator([this, validator]);
}

AsyncBaseValidator.prototype.union = function union(validator) {
    return new OrValidator([this, validator]);
}

AsyncBaseValidator.prototype.then = function then(validator) {
    return new ThenValidator(this, validator);
}

AsyncBaseValidator.prototype.isOptional = function isOptional() {
    let validator = isUndefined.union(this);
    Object.defineProperty(validator, '_isOptional', { // this property is a hook for the object validator.
        configurable: false,
        writable: false,
        enumerable: false,
        value: true
    })
    return validator;
}

AsyncBaseValidator.prototype.defaultTo = function defaultTo(defaultProc) {
    return new DefaultValidator(defaultProc);
}

function AsyncIsaValidator(isa, typeName) {
    BaseValidator.call(this);
    this.isa = isa;
    this.typeName = typeName;
}

AsyncIsaValidator.prototype = new AsyncBaseValidator();

AsyncIsaValidator.prototype.validate = function validate(v , path = '$') {
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
    return new AsyncIsaValidator(proc, typeName);
}

let isAny = isa((v) => v === undefined || v === null || v === '' || v === false || v === 0 || !!v, 'any');

function isLiteral(typeName) {
    return new AsyncIsaValidator((v) => v === typeName, typeName);
}

function isEnum(...typeNames) {
    return new AsyncOrValidator(typeNames.map(isLiteral));
}

const isNull = isLiteral(null);

const isUndefined = isLiteral(undefined);

function ConstraintValidator(constraint) {
    BaseValidator.call(this);
    this.constraint = constraint;
}

AsyncConstraintValidator.prototype = new AsyncBaseValidator();

AsyncConstraintValidator.prototype.validate = function validate(v, path = '$') {
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

AsyncTransformValidator.prototype = new AsyncBaseValidator();

AsyncTransformValidator.prototype.validate = function validate(v, path = '$') {
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

function AsyncThenValidator(step1, step2) {
    BaseValidator.call(this);
    this.step1 = step1;
    this.step2 = step2;
}

AsyncThenValidator.prototype = new AsyncBaseValidator();

AsyncThenValidator.prototype.validate = function validate(v, path = '$') {
    return this.step1.validate(v, path)
        .then((v1) => {
            return this.step2.validate(v1, path);
        })
}

// this one can be a bit difficult to think of... I think it's basically the same as the ThenValidator...
function AsyncAndValidator(inners) {
    BaseValidator.call(this);
    if (inners.length == 0)
        throw new Error(`AndValidator.zeroValidators`);
    this.validators = inners;
}

AsyncAndValidator.prototype = new AsyncBaseValidator();

AsyncAndValidator.prototype.validate = function validate(v, path = '$') {
    let first = this.validators[0];
    let rest = this.validators.slice(1);
    rest.forEach((next) => {
        first = new AsyncThenValidator(first, next);
    })
    return first.validate(v, path);
}

AsyncAndValidator.prototype.intersect = function intersect(validator) {
    return new AsyncAndValidator(this.validators.concat([validator]));
}

function AsyncOrValidator(validators) {
    BaseValidator.call(this);
    this.validators = validators;
}

AsyncOrValidator.prototype = new AsyncBaseValidator();

AsyncOrValidator.prototype.validate = function validate(value, path = '$') {
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

AsyncOrValidator.prototype.union = function union(validator) {
    return new AsyncOrValidator(this.validators.concat([validator]));
}

function AsyncDefaultValidator(defaultProc) {
    BaseValidator.call(this);
    this.defaultProc = defaultProc;
}

AsyncDefaultValidator.prototype = new AsyncBaseValidator();

AsyncDefaultValidator.prototype.validate = function validate(v, path) {
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
//*/

exports = module.exports = {
    BaseValidator : BaseValidator,
    isAny: isAny,
    isa: isa,
    isLiteral: isLiteral,
    isEnum: isEnum,
    isUndefined: isUndefined,
    isNull: isNull,
    byAsync: byAsync,
    oneOf: oneOf,
    allOf: allOf
};
