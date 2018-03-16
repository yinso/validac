class UnionValidator {
    constructor(validators) {
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
}

function isUnion(...validators) {
    return new UnionValidator(validators);
}

exports = module.exports = {
    isUnion : isUnion
};
