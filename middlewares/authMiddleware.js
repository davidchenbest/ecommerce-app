const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function authMiddleWare(req, res, next) {
    let token = req.cookies.jwtToken
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.send('not login')
            }
            else {
                req._id = decodedToken.id
                next()
            }
        })
    }
    else if (req.body.accessToken) {
        const { accessToken } = req.body
        jwt.verify(accessToken, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.send('not login')
            }
            else {
                req._id = decodedToken.id
                next()
            }
        })
    }
    else res.send('not login')
}

module.exports = { authMiddleWare }