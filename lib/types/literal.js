const { IsaValidator, isa } = require('../isa');

function isLiteral(value, typeName) {
    return isa((v) => v === value, typeName || value.toString());    
}

function convertLiteral(value, typeName) {
    return isLiteral(value, typeName).toConvert();
}

module.exports = {
    isLiteral: isLiteral,
    convertLiteral: convertLiteral
}
