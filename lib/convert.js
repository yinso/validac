'use strict';
const { BaseValidator , ValidationResult , isArrayOf, isConvertValidator, isConstraint } = require('./base');
const { pass } = require('./constraint');

function BaseConvertValidator () {

}

BaseConvertValidator.prototype = Object.create(BaseValidator.prototype);
BaseConvertValidator.prototype.constructor = BaseConvertValidator;

BaseConvertValidator.prototype.assert = function assert(value, path = '$') {
    return this.validate(value, path).cata(function (v) { return v });
}

BaseConvertValidator.prototype.where = function where(constraint) {
    return new ConstraintConvertValidator(this, constraint);
}

BaseConvertValidator.prototype.intersect = function where(validator) {
    return convertAllOf(this, validator)
}

BaseConvertValidator.prototype.union = function union(validator) {
    return convertOneOf(this, validator)
}

BaseConvertValidator.prototype.transform = function transform(transform)  {
    return new TransformConvertValidator(this, transform);
}

BaseConvertValidator.prototype.isOptional = function isOptional()  {
    return new OptionalConvertValidator(this);
}

BaseConvertValidator.prototype.defaultTo = function defaultTo(defaultProc )  {
    return new DefaultToConvertValidator(this, defaultProc);
}

BaseConvertValidator.prototype.cast = function cast()  {
    return this;
}

function TypeofConvertValidator(isa , typeName ) {
    BaseConvertValidator.call(this)
    this.isaProc = isa;
    this.typeName = typeName;
}

TypeofConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
TypeofConvertValidator.prototype.constructor = TypeofConvertValidator;

TypeofConvertValidator.prototype.validate = function validate(value , path  = '$') {
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

function ConstraintConvertValidator(validator, constraint) {
    BaseConvertValidator.call(this);
    this.validator = validator;
    if (isConstraint(constraint)) {
        this.constraint = constraint;
    } else {
        this.constraint = pass(constraint)
    }
}

ConstraintConvertValidator.prototype = new BaseConvertValidator();
ConstraintConvertValidator.prototype.constructor = ConstraintConvertValidator;

ConstraintConvertValidator.prototype.validate = function (value, path) {
    return this.validator.validate(value, path)
        .cata((v) => {
            //console.log('ConstraintConvertValidator.result')
            let errors = this.constraint.satisfy(v, path);
            if (errors.length > 0) {
                return ValidationResult.reject(errors)
            } else {
                return ValidationResult.resolve(v)
            }
        }, (e, _res) => _res)
}

function TransformConvertValidator(validator, transformProc ) {
    BaseConvertValidator.call(this)
    this.validator = validator;
    this.transformProc = transformProc;
}

TransformConvertValidator.prototype = new BaseConvertValidator();
TransformConvertValidator.prototype.constructor = TransformConvertValidator;

TransformConvertValidator.prototype.validate = function validate(value , path  = '$')  {
    //console.log('TransformValidator.validate_1', value, path, this.validator)
    return this.validator.validate(value, path)
        .cata((result) => {
            //console.log('TransformValidator.result', result);
            let res = this.transformProc(result);
            //console.log('TransformValidator.validate', value, result, res, path)
            return ValidationResult.resolve(res);
        }, (e, _res) => {
            //console.error('TransformValidator.error', e, _res)
            return _res
        })
}

function OptionalConvertValidator(validator) {
    BaseConvertValidator.call(this);
    this.validator = validator;
}

OptionalConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
OptionalConvertValidator.prototype.constructor = OptionalConvertValidator;

OptionalConvertValidator.prototype.validate = function validate(value, path = '$') {
    if (value === undefined) {
        return ValidationResult.resolve(value);
    }
    return this.validator.validate(value, path);
}

function DefaultToConvertValidator(validator, defaultToProc) {
    BaseConvertValidator.call(this);
    this.validator = validator;
    this.defaultToProc = defaultToProc;
}

DefaultToConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
DefaultToConvertValidator.prototype.constructor = DefaultToConvertValidator;

DefaultToConvertValidator.prototype.validate = function validate(value, path = '$') {
    if (value === undefined) {
        try {
            let defaultValue = this.defaultToProc();
            return this.validator.validate(defaultValue, path);
        } catch (e) {
            return ValidationResult.reject(e)
        }
    } else {
        return this.validator.validate(value, path)
    }
}

function transform(validator, transformProc )  {
    return new TransformConvertValidator(validator, transformProc);
}

let isArrayOfConvertValidators = isArrayOf(isConvertValidator);

function SequenceConvertValidator(validators) {
    BaseConvertValidator.call(this);
    if (!isArrayOfConvertValidators(validators)) {
        throw new Error(`InvalidValidators`);
    }
    this.validators = validators;
}

SequenceConvertValidator.prototype = new BaseConvertValidator();
SequenceConvertValidator.prototype.constructor = SequenceConvertValidator;

SequenceConvertValidator.prototype.validate = function validate(value, path = '$') {
    return this.validators.reduce((result, validator, i) => {
        return result.cata((v) => {
            return validator.validate(v, path);
        }, (e) => result);
    }, ValidationResult.resolve(value))
}

function IntersectConvertValidator(validators) {
    BaseConvertValidator.call(this);
    if (!isArrayOfConvertValidators(validators)) {
        throw new Error(`InvalidValidators`);
    }
    this.validators = validators
}

IntersectConvertValidator.prototype = new BaseConvertValidator();
IntersectConvertValidator.prototype.constructor = IntersectConvertValidator;

IntersectConvertValidator.prototype.validate = function validate(value, path = '$') {
    return this.validators.reduce((result, validator, i) => {
        return result.cata((v) => {
            return validator.validate(v, path);
        }, (e) => result);
    }, ValidationResult.resolve(value))
}

IntersectConvertValidator.prototype.intersect = function intersect(validator) {
    return new IntersectConvertValidator(this.validators.concat(validator));
}

function UnionConvertValidator(validators) {
    BaseValidator.call(this)
    if (!isArrayOfConvertValidators(validators)) {
       throw new Error(`InvalidValidators`);
    }
    this.validators = validators
}

UnionConvertValidator.prototype = new BaseConvertValidator();
UnionConvertValidator.prototype.constructor = UnionConvertValidator;

UnionConvertValidator.prototype.validate = function validate(value, path = '$') {
    return this.validators.reduce((result, validator, i) => {
        //console.log(`UnionConvertValidator.validate`, result, i, validator)
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

UnionConvertValidator.prototype.union = function union(validator) {
    return new UnionConvertValidator(this.validators.concat(validator));
}

function convertOneOf(...validators) {
    return new UnionConvertValidator(validators);
}

function convertAllOf(...validators) {
    return new IntersectConvertValidator(validators);
}

module.exports = {
    BaseConvertValidator,
    TypeofConvertValidator,
    TransformConvertValidator,
    ConstraintConvertValidator,
    convertOneOf,
    convertAllOf,
    OptionalConvertValidator,
    DefaultToConvertValidator,
}
