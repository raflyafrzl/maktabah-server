const {
  createContent,
  getContent,
  deleteContent,
  updateContent,
} = require("../../../service/mongoose/content");

const create = async (req, res, next) => {
  try {
    const result = await createContent(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const index = async (req, res, next) => {
  try {
    const result = await getContent();
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteContent(req);
    res.send({
      data: result,
    });
  } catch (error) {

    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateContent(req);
    res.send({
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
};
