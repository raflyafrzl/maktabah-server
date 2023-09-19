const express = require("express");
const route = express();
const { create, index } = require("./controller");
const {
  authenticatedUser,
  authorizedUser,
} = require("../../../middleware/auth");
route.post("/users", authenticatedUser, authorizedUser("super admin"), create);
route.get("/users", index);

module.exports = route;
