const {
  createTableOfContent,
  getAllTableOfContents,
  deleteTableOfContents,
  updateTableOfContents,
} = require("../../../service/mongoose/table-of-content");

const create = async (req, res, next) => {
  try {
    const result = await createTableOfContent(req);
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllTableOfContents();
    res.send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTableOfContents(req);
    res.send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTableOfContents(req);
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
