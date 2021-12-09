const { 
    CompareSecret
} = require('./Student_DB')

ValidateSecret = async (args) => {
    return await CompareSecret(args)
}

module.exports = {  
    ValidateSecret
}
