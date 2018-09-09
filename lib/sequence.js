const B = require('./base');

function ThenValidator(step1, step2) {
    B.BaseValidator.call(this)
    this.step1 = step1;
    this.step2 = step2;
}

ThenValidator.prototype = new B.BaseValidator();

ThenValidator.prototype.validate = function validate(value, path = '$') {
    return this.step1.validate(value, path)
        .cata((v1, _) => {
            return this.step2.validate(v1, path);
        }, (_, res) => res); // what does it mean that it'll throw? hmm... this doesn't compose as well!!!
}

function sequence(...steps) {
    if (steps.length === 0) {
        throw new Error(`Sequence.ThisCannotBeReached`)
    } else if (steps.length === 1) {
        return steps[0];
    } else {
        let reverse = steps.reverse()
        let last = reverse.shift()
        return reverse.reduce((validator, step) => {
            return new ThenValidator(step, validator);
        }, last)
    }
}

module.exports = {
    sequence: sequence,
    ThenValidator: ThenValidator
}
