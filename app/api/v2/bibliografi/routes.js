const express = require("express");
const router = express();
const { create, index, find, destroy } = require("./controller");

const {
  authenticatedUser,
  authorizedUser,
} = require("../../../middleware/auth");

const uploadFile = require("../../../middleware/multer");

router.post(
  "/bibliografi",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  uploadFile.single("avatar"),
  create
);
router.get(
  "/bibliografi",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  index
);
router.get(
  "/bibliografi/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  find
);
router.delete(
  "/bibliografi/:id",
  authenticatedUser,
  authorizedUser("admin", "super admin"),
  destroy
);

module.exports = router;
