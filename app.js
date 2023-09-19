var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const categoriesRouter = require("./app/api/v2/categories/routes");
const subCategoriesRouter = require("./app/api/v2/sub-categories/routes");
const bibliografiRouter = require("./app/api/v2/bibliografi/routes");
const tableOfContent = require("./app/api/v2/table-of-content/routes");
const contentRouter = require("./app/api/v2/content/route");
const maktabahYARSIRouter = require("./app/api/v2/maktabah-yarsi/routes");
const usersRouter = require("./app/api/v2/users/routes");
const authRoutes = require("./app/api/v2/auth/routes");

const errorHanlderMiddleware = require("./app/middleware/handler-error");
const notFoundHandlerMiddleware = require("./app/middleware/not-found");

const v2 = "/api/v2/cms";
const maktabahYARSI = "/api/v2";
var app = express();

// view engine setupw
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/", (_, res) => {
//   res.send({
//     message: "berhasil",
//   });
// });

app.use(v2, categoriesRouter);
app.use(v2, subCategoriesRouter);
app.use(v2, bibliografiRouter);
app.use(v2, tableOfContent);
app.use(v2, contentRouter);
app.use(v2, usersRouter);
app.use(v2, authRoutes);
app.use(maktabahYARSI, maktabahYARSIRouter);

app.use(errorHanlderMiddleware);
app.use(notFoundHandlerMiddleware);

module.exports = app;
