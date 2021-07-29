const express = require("express");
const { User } = require("../models/User");
const { handleErrors } = require("../utils/handleErrors");
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.find({}, { password: 0 })
    res.json(users)
})

router.get('/user/:id', async (req, res) => {
    const users = await User.findOne({ _id: req.params.id }, { password: 0 })
    res.json(users)
})

router.post("/registerAdmin", async (req, res) => {
    try {
        console.log(req.body, 19);
        const { username, password, email } = req.body;
        const user = new User({ username, password, email, role: "admin" });
        await user.save();
        res.send(user);
    } catch (err) {
        const error = handleErrors(err);
        res.json({ error });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id })
    res.json(!!result.deletedCount)
})

router.put('/editUser/:id', async (req, res) => {
    try {
        const { role, address, username, email } = req.body
        const user = await User.updateOne({ _id: req.params.id }, { role, address, username, email })
        res.json(!!user.nModified)
    } catch (err) {
        const error = handleErrors(err)
        res.json({ error })
    }
})

module.exports = router;
