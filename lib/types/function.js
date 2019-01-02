const { resolve , reject, filterErrors } = require('../base');
const { BaseIsaValidator } = require('../isa');

class ParameterListIsaValidator extends BaseIsaValidator {
    constructor(paramTypes) {
        super();
        this.paramTypes = paramTypes; // we'll need to deal with rest types in the future.
    }

    validate(args, path = '$') {
        console.log(`ParameterListIsaValidator.validate`, args);
        if (!(args instanceof Array)) {
            return reject({
                error: 'TypeError',
                path: path,
                expected: 'Array',
                actual: args
            })
        }
        // the array length should be the same (TODO - address rest param arity in the future) 
        if (args.length !== this.paramTypes.length) {
            return reject({
                error: 'ArityError',
                path: path,
                expected: this.paramTypes.length,
                actual: args.length
            })
        }
        // for now we'll just assume that each one is mapped appropriately.
        let errors = filterErrors(this.paramTypes.map((validator, i) => {
            return (typeof(validator) === 'function' ? validator() : validator).validate(args[i], path + '[' + i + ']');
        }));
        if (errors.length > 0) {
            return reject(errors);
        } else {
            return resolve(args);
        }
    }

    normalizeArgs(args) {
        return args;
    }

}

class FunctionIsaValidator extends BaseIsaValidator {
    constructor(options) {
        super();
        if (options.paramTypes) {
            this.paramTypes = new ParameterListIsaValidator(options.paramTypes);
        }
        if (options.returnType) {
            this.returnType = options.returnType;
        }
    }

    attach(proc) {
        Object.defineProperty(proc, '__$v', {
            value: this,
            writable: false,
            enumerable: false,
            configurable: false
        })
        return proc;
    }

    run(proc, ...args) {
        console.log(`FunctionIsaValidator.run`, args);
        if (this.paramTypes) {
            // for now we are just going to make assumptions that all args are required.
            let normedArgs = this.paramTypes.normalizeArgs(args);
            return this.paramTypes.validate(normedArgs)
                .cata((res) => proc(...res));
        } else {
            return proc(...args);
        }
    }

    _normalizeArgs(args) {
        return args;
    }

    validate(v, path = '$') {
        if (typeof(v) === 'function' || (v instanceof Function)) {
            // what are we testing next?
            // we are testing whether or
            if (!this.paramTypes) {
                return resolve(v);
            }
            // otherwise - we need to assignable test, which requires the concept of equality and canAssign.
        } else {
            reject({
                error: 'TypeError',
                type: 'Function',
                expected: 'Function',
                actual: v
            });
        }
    }
}

function signature() {
    let args = [].slice.call(arguments);
    return function (target, name, descriptor) {
        let proc = target;
        return {
            value: functionType(proc, ...args)
        }
    }
}

function functionType() {
    let args = [].slice.call(arguments);
    let proc = args.shift();
    let isFunc = isFunction(...args);
}

function isFunction() {
    if (arguments.length === 0) {
        return new FunctionIsaValidator({
        });
    }
    let paramTypes = [].slice.call(arguments);
    let returnType = paramTypes.pop();
    return new FunctionIsaValidator({
        paramTypes: paramTypes,
        returnType: returnType
    });
}

module.exports = {
    isFunction: isFunction,
    functionType: functionType
};
