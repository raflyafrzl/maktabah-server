const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtSecret:
    "asbdlkfgIUGSDFANSDnjaksdf8798BDSJKBFANDmAkTabhaYarsiJ98ysadfamcv78",
  jwtExpiration: "24h",
};
