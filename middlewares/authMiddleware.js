const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User } = require('../models/User');

const authMiddleWare = (roles) => (req, res, next) => {
    let token = req.cookies.jwtToken
    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.send('not login')
            }
            else {
                if (roles) {
                    const match = await userRoleMatch(roles, decodedToken.id)
                    if (!match) return res.send('role does not match')
                }
                req._id = decodedToken.id
                next()
            }
        })
    }
    else if (req.body.accessToken) {
        const { accessToken } = req.body
        jwt.verify(accessToken, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.send('not login')
            }
            else {
                if (roles) {
                    const match = await userRoleMatch(roles, decodedToken.id)
                    if (!match) return res.send('role does not match')
                }
                req._id = decodedToken.id
                next()
            }
        })
    }
    else res.send('not login')
}

async function userRoleMatch(roles, id) {
    const user = await User.findById(id)
    if (!user) return false
    if (roles.includes(user.role)) return user

}

module.exports = { authMiddleWare }