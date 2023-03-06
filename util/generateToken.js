const jwt = require('jsonwebtoken')


// First we give id..then secret key...then time after it expires
const generateToken = (id) => {
    return jwt.sign({ id }, 'HERO', {
        expiresIn:'30d'
    })
}

module.exports=generateToken