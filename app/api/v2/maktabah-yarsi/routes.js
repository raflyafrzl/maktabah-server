const express = require("express");
const router = express();
const {
  getAllCategoriesPage,
  getOneCategoriesPage,
  getAllBooksPage,
  getBookContent,
  searchBooks,
} = require("./controller");

router.get("/categories", getAllCategoriesPage);
router.get("/categories/:id", getOneCategoriesPage);
router.get("/books/:id", getAllBooksPage);
router.get("/book-content", getBookContent);
router.post("/search", searchBooks);
module.exports = router;
