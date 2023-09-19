const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  getOneCategories,
  getAllBooks,
  getContent,
  searchBook,
} = require("../../../service/mongoose/maktabah-yarsi");

const getAllCategoriesPage = async (req, res, next) => {
  try {
    const result = await getAllCategories();
    res.status(StatusCodes.OK).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOneCategoriesPage = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);
    res.status(StatusCodes.OK).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooksPage = async (req, res, next) => {
  try {
    const result = await getAllBooks(req);
    res.status(StatusCodes.OK).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBookContent = async (req, res, next) => {
  try {
    const result = await getContent(req);
    res.send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const result = await searchBook(req);

    res.send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategoriesPage,
  getOneCategoriesPage,
  getAllBooksPage,
  getBookContent,
  searchBooks,
};
