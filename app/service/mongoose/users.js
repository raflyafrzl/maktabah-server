const Users = require("../../api/v2/users/model");
const { BadRequestError } = require("../../errors");

const createUser = async (req) => {
  const { name, role, password, confPassword, email } = req.body;

  const checkEmail = await Users.find({ email });

  if (checkEmail.length)
    throw new BadRequestError("Email sudah terdaftar dalam sistem");

  if (password !== confPassword) {
    throw new BadRequestError("Password dan Confirm Password tidak sama");
  }
  const result = await Users.create({ name, role, password, email });

  return result;
};

const getUser = async (req) => {
  const projection = {
    _id: false,
    __v: false,
    password: false,
  };
  const result = await Users.find({}, projection);
  return result;
};

module.exports = {
  createUser,
  getUser,
};
