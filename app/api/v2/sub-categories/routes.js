const express = require("express");
const { create, index, update, destroy } = require("./controller");
const router = express();
const {
  authenticatedUser,
  authorizedUser,
} = require("../../../middleware/auth");

router.post(
  "/sub-categories",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  create
);
router.get(
  "/sub-categories",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  index
);
router.put(
  "/sub-categories/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  update
);
router.delete(
  "/sub-categories/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  destroy
);

module.exports = router;
