require("dotenv").config({path: `${__dirname}/.env`});
require(`${__dirname}/api/models/db`);
const express = require('express');
const fileupload = require("express-fileupload");
const webp = require("webp-converter");

const apiRouter = require(`${__dirname}/api/routes/kotapi`);
const kotsRouter = require(`${__dirname}/api/routes/kots`);

const app = express();

app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

webp.grant_permission();

app.disable("x-powered-by");
app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', kotsRouter);
app.use('/kotapi', apiRouter);

module.exports = app;
