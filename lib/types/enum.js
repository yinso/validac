const { isa } = require('../isa')

function isEnum(...typeNames) {
    return isa((v) => typeNames.indexOf(v) > -1, typeNames.join(' | '))
}

module.exports = {
    isEnum: isEnum
}
