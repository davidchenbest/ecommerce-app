const express = require("express");
const { JWT_MAX_TIME } = require("../config");
const router = express.Router();
const { User } = require("../models/User");
const { createJWT } = require("../utils/createJWT");
const { handleErrors } = require("../utils/handleErrors");

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, address } = req.body
    const user = new User({ username, password, email, address })
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
    const { id, role } = await User.login(username, password)
    const accessToken = createJWT(id)
    res.cookie('jwtToken', accessToken, { httpOnly: true, maxAge: JWT_MAX_TIME * 1000 })
    res.json({ accessToken, expiresAt: JWT_MAX_TIME, timeUnit: 'second', role })
  } catch (err) {
    const error = handleErrors(err)
    res.json({ error })
  }
})

module.exports = router;
