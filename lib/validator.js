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

// are all IsaValidator derived from this?
// we need to think about what it means in this case...
function BaseIsaValidator(isa, typeName) {
    BaseValidator.call(this);
    this.isaProc = isa;
    this.typeName = typeName;
}

BaseIsaValidator.prototype = new BaseValidator();

function isIsaValidator(item) {
    return !!item && typeof(item.isa) === 'function';
}

BaseIsaValidator.prototype.validate = function validate(v , path = '$') {
    if (this.isaProc(v)) {
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

BaseValidator.prototype.isa = function (v) {
    return this.validate(v)
        .cata((v) => true, (e) => false)
}

function isa(proc, typeName) {
    return new BaseIsaValidator(proc, typeName);
}

let isAny = isa((v) => v === undefined || v === null || v === '' || v === false || v === 0 || !!v, 'any');

function isLiteral(typeName, name) {
    return new BaseIsaValidator((v) => v === typeName, name || typeName);
}

function isEnum(...typeNames) {
    return new BaseIsaValidator((v) => typeNames.indexOf(v) > -1);
}

const isNull = isLiteral(null, 'null');

const isUndefined = isLiteral(undefined, 'undefined');

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

function BaseConvertValidator () {
    BaseValidator.call(this);
}

BaseConvertValidator.prototype = new BaseValidator();

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

function sequence(step1, step2) {
    return new ThenValidator(step1, step2);
}

// this one can be a bit difficult to think of... I think it's basically the same as the ThenValidator...
function AndValidator(inners) {
    BaseValidator.call(this);
    if (inners.length == 0)
        throw new Error(`AndValidator.zeroValidators`);
    this.validators = inners;
}

AndValidator.prototype = new BaseIsaValidator();

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

function andIsaValidators(validators) {
    return new AndValidator(validators)
}

function allOf() {
    let validators = [].slice.call(arguments)
    if (areAllIsaValidators(validators)) {
        return andIsaValidators(validators)
    }
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

function areAllIsaValidators(validators) {
    for (var i = 0; i < validators.length; ++i) {
        if (!isIsaValidator(validators[i])) {
            return false
        }
    }
    return true
}

function orIsaValidators(validators) {
    return new OrValidator(validators)
}

function oneOf() {
    let validators = [].slice.call(arguments)
    if (areAllIsaValidators(validators)) {
        return orIsaValidators(validators)
    } 
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
    allOf: allOf,
    BaseIsaValidator: BaseIsaValidator,
    BaseConvertValidator: BaseConvertValidator,
    sequence: sequence
};
