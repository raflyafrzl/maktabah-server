const SubCategories = require("./model");
const Category = require("../categories/model");
const {
  createSubCategories,
  getAllSubCategories,
  updateSubCategories,
  deleteSubCategories,
} = require("../../../service/mongoose/sub-categories");

const create = async (req, res, next) => {
  try {
    const result = await createSubCategories(req);

    res.status(201).json({
      message: "Succefully Created",
      data: result,
    });
  } catch (error) {

    next(error);
  }
};

const index = async (_, res, next) => {
  try {
    const result = await getAllSubCategories();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateSubCategories(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteSubCategories(req);
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
  update,
  destroy,
};
