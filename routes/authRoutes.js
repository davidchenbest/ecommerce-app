const express = require("express");
const { JWT_MAX_TIME } = require("../config");
const router = express.Router();
const { User } = require("../models/User");
const { createJWT } = require("../utils/createJWT");

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = new User({ username, password })
        await user.save()
        res.send(user)
    } catch (err) {
        const error = handleErrors(err)
        res.json({ error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const { id } = await User.login(username, password)
        const accessToken = createJWT(id)
        res.cookie('jwtToken', accessToken, { httpOnly: true, maxAge: JWT_MAX_TIME * 1000 })
        res.json({ accessToken })
    } catch (err) {
        const error = handleErrors(err)
        res.json({ error })
    }
})

function handleErrors(err) {
    let errors = {}
    if (err.code === 11000) {
        errors.username = 'that username is already registered';
        return errors;
    }
    if (err.message === 'incorrect username') {
        errors.username = 'Incorrect Credentials';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'Incorrect Credentials';
    }
    if (err.errors) {
        const keys = Object.keys(err.errors)
        keys.forEach(k => {
            errors[k] = err.errors[k].message
        });
    }
    return errors
}

module.exports = router;
