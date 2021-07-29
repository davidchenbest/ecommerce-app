const express = require("express");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { User } = require("../models/User");
const { handleErrors } = require("../utils/handleErrors");
const router = express.Router();

router.get('/profile', authMiddleWare(), async (req, res) => {
    const user = await User.findById(req._id, { password: 0 })
    res.json(user)
})

router.post('/editProfile', authMiddleWare(), async (req, res) => {
    try {
        const { address, username, email } = req.body
        const user = await User.updateOne({ _id: req._id }, { address, username, email })
        res.json(!!user.nModified)
    } catch (err) {
        const error = handleErrors(err)
        res.send({ error })
    }
})

module.exports = router;
