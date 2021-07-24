const express = require("express");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { User } = require("../models/User");
const router = express.Router();

router.get('/profile', authMiddleWare(), async (req, res) => {
    const user = await User.findById(req._id, { password: 0 })
    res.json(user)
})

router.post('/editProfile', authMiddleWare(), async (req, res) => {
    try {
        const { address } = req.body
        const user = await User.updateOne({ _id: req._id }, { address })
        res.json(!!user.nModified)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

module.exports = router;
