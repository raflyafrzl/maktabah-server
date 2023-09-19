const express = require("express");
const { signInCMS } = require("./controller");
const route = express();

route.post("/auth/signin", signInCMS);

module.exports = route;
