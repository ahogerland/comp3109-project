const { 
    TokenExists,
    CompareSecret
} = require('./Student_DB')

ValidateTokenExists = async (token) => {
    return await TokenExists(token)
}

ValidateSecret = async (args) => {
    return await CompareSecret(args)
}

module.exports = {  
    ValidateTokenExists,
    ValidateSecret
}
