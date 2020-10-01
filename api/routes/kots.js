const express = require('express');
const router = express.Router();

router.get('/kots/:kotname', function(req, res) {
    res.sendFile(`./kots/${req.params.kotname}`, { root: `${__dirname}/../../` }, (err) => {
        if (err) {
            console.log(err);
            if (err.status == 404) {
                res.status(404).json({ error: "Not found", failed: true, status: 404 });
            } else {
                res.status(400).json({ error: err, failed: true, status: 400 });
            }
        }
    });
});

module.exports = router;