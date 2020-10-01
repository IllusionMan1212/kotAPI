const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const fs = require("fs");
const Kots = require(`${__dirname}/../models/kots`);

router.get('/', function (req, res) {
    Kots.find((err, kots) => {
        if (err) res.status(500).json({ error: err, failed: true, status: 500 });
        if (kots) {
            let random = Math.floor(Math.random() * Math.floor(kots.length));
            res.status(200).json({ id: kots[random].id, url: kots[random].url, failed: false, status: 200 });
        }
    });
});

router.post('/addkot', (req, res) => {
    if (!req.files || !req.files.image) {
        res.status(400).json({ error: "Badly formatted request data", failed: true, status: 400 });
    }
    if (req.body.password != process.env.PASSWORD) {
        res.status(401).json({ error: "You don't have sufficient permissions", failed: true, status: 401 });
    }
    let kot = new Kots();

    let salt = crypto.randomBytes(16).toString("hex");
    let extension = req.files.image.name.substring(req.files.image.name.length - 4)
    let imageName = crypto.pbkdf2Sync(req.files.image.name, salt, 1000, 16, "sha512").toString("hex") + extension;

    if (req.files && req.files.image) {
        if (!fs.existsSync(`${__dirname}/../../kots`)) {
            fs.mkdir(`${__dirname}/../../kots`, (err) => {
                if (err) res.status(500).json({ error: err, failed: true, status: 500 });
            });
        }
        fs.writeFileSync(`${__dirname}/../../kots/` + imageName, req.files.image.data, (err) => {
            if (err) res.status(500).json({ error: err, failed: true, status: 500 });
        });
    }
    Kots.find({}, null, { sort: { id: 1 }}, (err, kots) => {
        if (err) res.status(500).json({ error: err, failed: true, status: 500 });

        for (let i = 0; i < kots.length; i++) {
            if (kots[i].id != i + 1) {
                var newId = i + 1;
                break;
            }
        }
        kot.id = newId || kots.length + 1;
        kot.url = `${process.env.KOT_BASE_URL}/${imageName}`;
        kot.save();
    });

    res.status(201).json({ content: { message: "Successfully welcomed a new kot :)" }, failed: false, status: 201 });
});

module.exports = router;