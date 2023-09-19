const express = require("express");
const router = express();
const { create, index, destroy, update } = require("./controller");
const {
  authenticatedUser,
  authorizedUser,
} = require("../../../middleware/auth");

router.post(
  "/table-of-content",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  create
);
router.get(
  "/table-of-content",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  index
);
router.delete(
  "/table-of-content/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  destroy
);
router.put(
  "/table-of-content/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  update
);

module.exports = router;
