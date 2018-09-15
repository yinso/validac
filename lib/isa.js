'use strict';

const { BaseValidator , ValidationResult, isConstraint } = require('./base');
const { check, pass } = require('./constraint');
const { convertAllOf, convertOneOf , TypeofConvertValidator, TransformConvertValidator, ConstraintConvertValidator, wrapConvert , OptionalConvertValidator , DefaultToConvertValidator } = require('./convert');

function BaseIsaValidator () {
    BaseValidator.call(this)
}

BaseIsaValidator.prototype = Object.create(BaseValidator.prototype);
BaseIsaValidator.prototype.constructor = BaseIsaValidator;

BaseIsaValidator.prototype.isa = function isa(value, path = '$') {
    return this.validate(value, path).cata((_) => true, (_) => false);
}

BaseIsaValidator.prototype.where = function where(constraint) {
    return new ConstraintIsaValidator(this, constraint);
}

BaseIsaValidator.prototype.intersect = function intersect(validator) {
    return new IntersectIsaValidator([this, validator]);
}

BaseIsaValidator.prototype.union = function union(validator) {
    return new UnionIsaValidator([this, validator]);
}

BaseIsaValidator.prototype.transform = function transform(transformProc) {
    return new TransformConvertValidator(this, transformProc);
}

BaseIsaValidator.prototype.isOptional = function isOptional() {
    return new OptionalConvertValidator(this);
}

BaseIsaValidator.prototype.defaultTo = function defaultTo(defaultProc) {
    return new DefaultToIsaValidator(this, defaultProc);
}

BaseIsaValidator.prototype.cast = function cast() {
    return this;
}

BaseIsaValidator.prototype.toConvert = function toConvert() {
    return this.transform((v) => v);
}

function OptionalIsaValidator(validator) {
    BaseIsaValidator.call(this);
    this.validator = validator;
}

OptionalIsaValidator.prototype = Object.create(BaseIsaValidator.prototype);
OptionalIsaValidator.prototype.constructor = OptionalIsaValidator;

OptionalConvertValidator.prototype.validate = function validate(value, path = '$') {
    if (value === undefined) {
        return ValidationResult.resolve(value);
    }
    return this.validator.validate(value, path);
}

OptionalIsaValidator.prototype.toConvert = function toConvert() {
    return new OptionalConvertValidator(this.validator.toConvert());
}

function DefaultToIsaValidator(validator, defualtToProc) {
    BaseIsaValidator.call(this);
    this.validator = validator;
    this.defualtToProc = defualtToProc;
}

DefaultToIsaValidator.prototype = Object.create(BaseIsaValidator.prototype);
DefaultToIsaValidator.prototype.constructor = DefaultToIsaValidator;

DefaultToIsaValidator.prototype.validate = function validate(value, path = '$') {
    return this.validator.validate(value, path);
}

DefaultToIsaValidator.prototype.toConvert = function () {
    return new DefaultToConvertValidator(this.validator.toConvert(), this.defualtToProc);
}

function WrapperIsaValidator(inner) {
    BaseIsaValidator.call(this);
    this.inner = inner;
}

WrapperIsaValidator.prototype = Object.create(BaseIsaValidator.prototype);
WrapperIsaValidator.prototype.constructor = WrapperIsaValidator;

WrapperIsaValidator.prototype.validate = function validate(value, path = '$') {
    return this.inner.validate(value, path);
}

WrapperIsaValidator.prototype.toConvert =function toConvert() {
    return wrapConvert(this.inner)
}

function wrapIsa(inner) {
    return new WrapperIsaValidator(inner);
}

function TypeofIsaValidator(isa, typeName) {
    BaseIsaValidator.call(this)
    this.isaProc = isa;
    this.typeName = typeName;
}

TypeofIsaValidator.prototype = Object.create(BaseIsaValidator.prototype);
TypeofIsaValidator.prototype.constructor = TypeofIsaValidator;

TypeofIsaValidator.prototype.validate = function validate(value, path = '$') {
    if (this.isaProc(value)) {
        return ValidationResult.resolve(value);
    } else {
        return ValidationResult.reject({
            error: 'TypeError',
            expected: this.typeName,
            path,
            actual: value
        });
    }
}

TypeofIsaValidator.prototype.toConvert = function toConvert() {
    return new TypeofConvertValidator(this.isaProc, this.typeName)
}

function isa(test, typeName) {
    return new TypeofIsaValidator(test, typeName);
}

function ConstraintIsaValidator(validator, constraint) {
    BaseIsaValidator.call(this);
    this.validator = validator;
    if (isConstraint(constraint)) {
        this.constraint = constraint;
    } else {
        this.constraint = pass(constraint)
    }
}

ConstraintIsaValidator.prototype = Object.create(BaseIsaValidator.prototype)
ConstraintIsaValidator.prototype.constructor = ConstraintIsaValidator;

ConstraintIsaValidator.prototype.validate = function validate(value, path = '$') {
    let errors = this.constraint.satisfy(value, path);
    if (errors.length > 0) {
        return ValidationResult.reject(errors)
    } else {
        return ValidationResult.resolve(value)
    }
}

ConstraintIsaValidator.prototype.toConvert = function toConvert() {
    return new ConstraintConvertValidator(this.validator.toConvert(), this.constraint);
}

function SequenceIsaValidator(steps) {
    BaseIsaValidator.call(this);
    this.steps = steps;
}

SequenceIsaValidator.prototype = Object.create(BaseIsaValidator.prototype);
SequenceIsaValidator.prototype.constructor = SequenceIsaValidator;

SequenceIsaValidator.prototype.validate = function validate(value, path = '$') {
    return this.steps.reduce((result, validator, i) => {
        return result.cata((v) => {
            return validator.validate(v, path);
        }, (e) => result);
    }, ValidationResult.resolve(value))
}

SequenceIsaValidator.prototype.toConvert = function toConvert() {
    return new SequenceConvertValidator(this.steps.map((step) => step.toConvert()))
}

function IntersectIsaValidator(validators) {
    BaseIsaValidator.call(this);
    this.validators = validators
}

IntersectIsaValidator.prototype = Object.create(BaseIsaValidator.prototype);
IntersectIsaValidator.prototype.constructor = IntersectIsaValidator;

IntersectIsaValidator.prototype.validate = function validate(value, path = '$') {
    return this.validators.reduce((result, validator, i) => {
        return result.cata((v) => {
            return validator.validate(v, path);
        }, (e) => result);
    }, ValidationResult.resolve(value))
}

IntersectIsaValidator.prototype.intersect = function intersect(validator) {
    return new IntersectIsaValidator(this.validators.concat(validator))
}

IntersectIsaValidator.prototype.toConvert = function toConvert() {
    return convertAllOf(...this.validators.map((step) => step.toConvert()))
}

function UnionIsaValidator(validators) {
    BaseIsaValidator.call(this);
    this.validators = validators
}

UnionIsaValidator.prototype = Object.create(BaseIsaValidator.prototype);
UnionIsaValidator.prototype.constructor = UnionIsaValidator;

UnionIsaValidator.prototype.validate = function validate(value, path = '$') {
    return this.validators.reduce((result, validator, i) => {
        return result.cata((v) => {
            return result;
        }, (e) => validator.validate(value, path));
    }, ValidationResult.reject({
        error: 'UnionIsaError',
        path,
        expected: 'OneOfMatches',
        actual: value
    }))
}

UnionIsaValidator.prototype.union = function union(validator) {
    return new UnionIsaValidator(this.validators.concat(validator))
}

UnionIsaValidator.prototype.toConvert = function toConvert() {
    return convertOneOf(...this.validators.map((v) => v.toConvert()))
}

function isSequence(...validators) {
    return new SequenceIsaValidator(validators);
}

function isOneOf(...validators) {
    return new UnionIsaValidator(validators);
}

function isAllOf(...validators) {
    return new IntersectIsaValidator(validators);
}

module.exports = {
    BaseIsaValidator,
    ConstraintIsaValidator,
    isa,
    isSequence,
    isOneOf,
    isAllOf,
    wrapIsa,
    
}
