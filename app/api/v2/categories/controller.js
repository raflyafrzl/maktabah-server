const { BadRequestError } = require("../../../errors");
const {
  createCategories,
  getAllCategories,
  deleteCategories,
  updateCategories,
  getOneCategories,
} = require("../../../service/mongoose/categories");

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);
    res.status(201).json({
      message: "SUCCESSFULLY CREATED",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllCategories();
    res.status(200).json({
      data: result,
    });
  } catch (error) {

    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategories(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {

    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
  destroy,
  update,
  find,
};
