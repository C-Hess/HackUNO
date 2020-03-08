const express = require('express');

const app = express();

app.use('/',require("./routes"));

let PORT = 5000;

app.listen(PORT)
