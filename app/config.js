const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtSecret:process.env.JWT_KEY,
  jwtExpiration: "24h",
};
