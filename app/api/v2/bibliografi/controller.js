const {
  createBibliografi,
  getAllBibliografi,
  getBibliografiByID,
  deleteBibliografi,
} = require("../../../service/mongoose/bibliografi");

const create = async (req, res, next) => {
  try {
    const result = await createBibliografi(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {

    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllBibliografi();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.status(200).json({
      data: "",
    });
  } catch (error) {
    next(error);
  }
};
const destroy = async (req, res, next) => {
  try {
    const result = await deleteBibliografi(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {

    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getBibliografiByID(req);
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
  find,
};
