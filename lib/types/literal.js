const { isa } = require('../isa');

function isLiteral(value, typeName) {
    return isa((v) => v === value, typeName || value.toString());    
}

module.exports = {
    isLiteral: isLiteral
}
