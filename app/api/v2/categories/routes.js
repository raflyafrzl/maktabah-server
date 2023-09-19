const express = require("express");
const { create, index, destroy, update, find } = require("./controller");
const router = express();

const {
  authenticatedUser,
  authorizedUser,
} = require("../../../middleware/auth");

router.post(
  "/categories",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  create
);
router.get(
  "/categories",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  index
);
router.get(
  "/categories/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  find
);
router.delete(
  "/categories/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  destroy
);
router.put(
  "/categories/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  update
);

module.exports = router;
