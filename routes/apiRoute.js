const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
router.get("/", auth, async (req, res) => {
    try {
        if (!auth) {
            res.status(400).json({
                error: "Not authorized"
            });
        }
        else{
            res.status(200).json({
                msg: "Authorized" + req.id
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
