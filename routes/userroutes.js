const express = require("express");
const authenticateToken = require("../middleware/authmiddleware");

const router=express.Router();

router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "Protected Profile Data",
        user: req.user
    });
});

module.exports = router;