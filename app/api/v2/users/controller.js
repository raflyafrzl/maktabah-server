const { createUser, getUser } = require("../../../service/mongoose/users");

const create = async (req, res, next) => {
  try {
    const result = await createUser(req);
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
    const result = await getUser();
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
};
