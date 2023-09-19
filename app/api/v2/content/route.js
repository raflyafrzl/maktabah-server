const express = require("express");
const router = express();
const { create, index, destroy, update } = require("./controller");
const {
  authenticatedUser,
  authorizedUser,
} = require("../../../middleware/auth");

router.get(
  "/contents",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  index
);
router.post(
  "/contents",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  create
);
router.delete(
  "/contents/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  destroy
);

router.put(
  "/contents/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  update
);

module.exports = router;
