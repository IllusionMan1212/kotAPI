const express = require('express');
const router = express.Router();

router.get('/kots/:kotname', (req, res) => {
    res.sendFile(`./kots/${req.params.kotname}`, { root: `${__dirname}/../../` }, (err) => {
        if (err) {
            if (err.status == 404) {
                res.status(404).json({ error: "Not found", failed: true, status: 404 });
                return;
            } else {
                res.status(400).json({ error: err, failed: true, status: 400 });
                return;
            }
        }
    });
});

router.get('/kots/compressed/:kotname', (req, res) => {
    res.sendFile(`./kots/compressed/${req.params.kotname}`, { root: `${__dirname}/../../` }, (err) => {
        if (err) {
            if (err.status == 404) {
                res.status(404).json({ error: "Not found", failed: true, status: 404 });
                return;
            } else {
                res.status(400).json({ error: err, failed: true, status: 400 });
                return;
            }
        }
    })
});

module.exports = router;