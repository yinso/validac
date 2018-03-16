class ThenValidator {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }

    validate(value, path = '$') {
        return this.first.validate(value, path)
            .then((res) => {
                return this.second.validate(value, path);
            });
    }
}

function chain(v1, ...rest) {
    let result = v1;
    rest.forEach((validator) => {
        result = new ThenValidator(result, validator);
    });
    return result;
}

exports = module.exports = {
    chain: chain
}