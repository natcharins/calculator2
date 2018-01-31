"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use("/", require('./api/account'));
app.use("/", require('./api/data'));

app.listen(3000)