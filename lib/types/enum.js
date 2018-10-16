const { isa , BaseIsaValidator } = require('../isa')

function EnumIsaValidator(typeNames) {
    BaseIsaValidator.call(this);
    this.typeNames = typeNames;
    this.typeMaps = typeNames.reduce((acc, typeName) => {
        acc[typeName] = typeName;
        return acc
    }, {})
}

EnumIsaValidator.prototype = Object.create(BaseIsaValidator.prototype);
EnumIsaValidator.prototype.constructor = EnumIsaValidator;

// enum is a big problem...
// it's difficult to extend...
// we don't just want strings. we want each string to be a literal type.
// the problem is that it's difficult to specify the type.
// and if we want a function that does extend, we won't really know that!
EnumIsaValidator.prototype.union = function (validator) {

}


function isEnum(...typeNames) {
    return isa((v) => typeNames.indexOf(v) > -1, typeNames.join(' | '))
}

module.exports = {
    isEnum: isEnum,
    EnumIsaValidator: EnumIsaValidator
}
