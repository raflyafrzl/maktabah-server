const { signIn } = require("../../../service/mongoose/auth");

const signInCMS = async (req, res, next) => {
  try {
    const result = await signIn(req);
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signInCMS,
};
