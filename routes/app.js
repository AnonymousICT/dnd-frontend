const router = require("express").Router();
const path = require('path');

router.get("/", (req, res) => {
    try {
        res.set('path', path.join(__dirname+ '/../build/index.html'));
        res.sendFile(path.join(__dirname+ '/../build/index.html'));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
