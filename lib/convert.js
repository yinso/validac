'use strict';
const { BaseValidator , ValidationResult , resolve, reject, isArrayOf, isConvertValidator, isConvertValidatorCompat, isConstraint, isFunction } = require('./base');
const { pass } = require('./constraint');

function BaseConvertValidator (convertOptions) {
    if (!convertOptions) {
        throw new Error(`MissingConvertOptions`);
    }
    this.convertOptions = convertOptions;
}

BaseConvertValidator.prototype = Object.create(BaseValidator.prototype);
BaseConvertValidator.prototype.constructor = BaseConvertValidator;

BaseConvertValidator.prototype.assert = function assert(value, path = '$') {
    return this.validate(value, path).cata(function (v) { return v });
}

BaseConvertValidator.prototype.where = function where(constraint) {
    return new ConstraintConvertValidator(this, constraint, this.convertOptions);
}

BaseConvertValidator.prototype.intersect = function where(validator) {
    return _convertAllOf(this, [ validator ], this.convertOptions);
}

BaseConvertValidator.prototype.union = function union(validator) {
    return _convertOneOf(this, [ validator ], this.convertOptions) // how to pass in the convert options? 
}

BaseConvertValidator.prototype.transform = function transform(transform)  {
    return new TransformConvertValidator(this, transform, this.convertOptions);
}

BaseConvertValidator.prototype.isOptional = function isOptional()  {
    return new OptionalConvertValidator(this, this.convertOptions);
}

BaseConvertValidator.prototype.defaultTo = function defaultTo(defaultProc )  {
    return new DefaultToConvertValidator(this, defaultProc, this.convertOptions);
}

function TypeofConvertValidator(isa , typeName, convertOptions) {
    BaseConvertValidator.call(this, convertOptions)
    this.isaProc = isa;
    this.typeName = typeName;
}

TypeofConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
TypeofConvertValidator.prototype.constructor = TypeofConvertValidator;

TypeofConvertValidator.prototype.validate = function validate(value , path  = '$') {
    if (this.isaProc(value)) {
        return resolve(value);
    } else {
        return reject({
            error: 'TypeError',
            expected: this.typeName,
            path,
            actual: value
        });
    }
}

function ConstraintConvertValidator(validator, constraint, convertOptions) {
    BaseConvertValidator.call(this, convertOptions);
    this.validator = validator;
    if (isConstraint(constraint)) {
        this.constraint = constraint;
    } else {
        this.constraint = pass(constraint)
    }
}

ConstraintConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
ConstraintConvertValidator.prototype.constructor = ConstraintConvertValidator;

ConstraintConvertValidator.prototype.validate = function (value, path) {
    return this.validator.validate(value, path)
        .cata((v) => {
            //console.log('ConstraintConvertValidator.result')
            let errors = this.constraint.satisfy(v, path);
            if (errors.length > 0) {
                return reject(errors)
            } else {
                return resolve(v)
            }
        }, (e, _res) => _res)
}

function TransformConvertValidator(validator, transformProc, convertOptions) {
    BaseConvertValidator.call(this, convertOptions)
    this.validator = validator;
    this.transformProc = transformProc;
}

TransformConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
TransformConvertValidator.prototype.constructor = TransformConvertValidator;

TransformConvertValidator.prototype.validate = function validate(value , path  = '$')  {
    //console.log('TransformValidator.validate_1', value, path, this.validator)
    return this.validator.validate(value, path)
        .cata((result) => {
            //console.log('TransformValidator.result', result);
            let res = this.transformProc(result);
            //console.log('TransformValidator.validate', value, result, res, path)
            return resolve(res);
        }, (e, _res) => {
            //console.error('TransformValidator.error', e, _res)
            return _res
        })
}

function OptionalConvertValidator(validator, convertOptions) {
    BaseConvertValidator.call(this, convertOptions);
    this.validator = validator;
}

OptionalConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
OptionalConvertValidator.prototype.constructor = OptionalConvertValidator;

OptionalConvertValidator.prototype.validate = function validate(value, path = '$') {
    if (value === undefined) {
        return resolve(value);
    }
    return this.validator.validate(value, path);
}

function DefaultToConvertValidator(validator, defaultToProc, convertOptions) {
    BaseConvertValidator.call(this, convertOptions);
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
            return reject(e)
        }
    } else {
        return this.validator.validate(value, path)
    }
}

function transform(validator, transformProc)  {
    return new TransformConvertValidator(validator, transformProc);
}

let isArrayOfConvertValidators = isArrayOf(isConvertValidator);

let isArrayOfConvertValidatorCompats = isArrayOf(isConvertValidatorCompat);

function SequenceConvertValidator(validators, convertOptions) {
    BaseConvertValidator.call(this, convertOptions);
    if (!isArrayOfConvertValidators(validators)) {
        throw new Error(`InvalidValidators`);
    }
    this.validators = validators;
}

SequenceConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
SequenceConvertValidator.prototype.constructor = SequenceConvertValidator;

SequenceConvertValidator.prototype.validate = function validate(value, path = '$') {
    return this.validators.reduce((result, validator, i) => {
        return result.cata((v) => {
            return validator.validate(v, path);
        }, (e) => result);
    }, resolve(value))
}

function IntersectConvertValidator(validators, convertOptions) {
    BaseConvertValidator.call(this, convertOptions);
    if (!isArrayOfConvertValidatorCompats(validators)) {
        throw new Error(`InvalidValidators`);
    }
    this.validators = validators
}

IntersectConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
IntersectConvertValidator.prototype.constructor = IntersectConvertValidator;

IntersectConvertValidator.prototype.validate = function validate(value, path = '$') {
    return this.validators.reduce((result, validator, i) => {
        return result.cata((v) => {
            return (isConvertValidator(validator) ? validator : validator()).validate(v, path);
        }, (e) => result);
    }, resolve(value))
}

IntersectConvertValidator.prototype.intersect = function intersect(validator) {
    return new IntersectConvertValidator(this.validators.concat(validator), this.convertOptions);
}

function UnionConvertValidator(validators, convertOptions) {
    BaseValidator.call(this, convertOptions)
    if (!isArrayOfConvertValidatorCompats(validators)) {
        console.log('UnionConvertValidator.error', validators)
        throw new Error(`InvalidValidators`);
    }
    this.validators = validators
}

UnionConvertValidator.prototype = Object.create(BaseConvertValidator.prototype);
UnionConvertValidator.prototype.constructor = UnionConvertValidator;

UnionConvertValidator.prototype.validate = function validate(value, path = '$') {
    return this.validators.reduce((result, validator, i) => {
        //console.log(`UnionConvertValidator.validate`, result, i, validator)
        return result.cata((v) => {
            return result;
        }, (e) => (isConvertValidator(validator) ? validator : validator()).validate(value, path));
    }, reject({
        error: 'UnionIsaError',
        path,
        expected: 'OneOfMatches',
        actual: value
    }))
}

UnionConvertValidator.prototype.union = function union(validator) {
    return new UnionConvertValidator(this.validators.concat(validator), this.convertOptions);
}

function convertOneOf(...validators) {
    return _convertOneOf(validators, {});
}

function _convertOneOf(validators, options) {
    return new UnionConvertValidator(validators, options);
}

function convertAllOf(...validators) {
    return _convertAllOf(validators, {})
}

function _convertAllOf(validators, options) {
    return new IntersectConvertValidator(validators, options);
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
