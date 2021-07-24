const express = require("express");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get('/profile', authMiddleWare, (req, res) => {
    res.send(req._id)
})

module.exports = router;
