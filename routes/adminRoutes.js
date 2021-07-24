const express = require("express");
const { User } = require("../models/User");
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({}, { password: 0 })
    res.json(users)
})

router.delete('/deleteUser/:id', async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id })
    res.json(!!result.deletedCount)
})


module.exports = router;
