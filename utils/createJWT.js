const { JWT_SECRET, JWT_MAX_TIME } = require("../config");
const jwt = require('jsonwebtoken');

function createJWT(id) {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_MAX_TIME
    });
}

module.exports = { createJWT }