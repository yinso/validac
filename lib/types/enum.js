const { isa } = require('../isa')

function isEnum(...typeNames) {
    return isa((v) => typeNames.indexOf(v) > -1, typeNames.join(' | '))
}

function convertEnum(...typeNames) {
    return isEnum(...typeNames).transform((v) => v);    
}

module.exports = {
    isEnum: isEnum,
    convertEnum: convertEnum
}
