const bcrypt = require('bcrypt')

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compareHash(passwordUser, passwordDB) {
    return bcrypt.compareSync(passwordUser, passwordDB)
}



module.exports = {hashPassword, compareHash}