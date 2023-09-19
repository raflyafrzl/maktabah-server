const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bibliografiSchema = Schema({
  _id: {
    type: Schema.Types.String,
    required: [true, "harus memasukkan id"],
  },
  category: {
    type: Schema.Types.ObjectId,
    required: [true, "Kategori harus diisi!"],
    ref: "Category",
  },
  sub_category: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    default: null,
  },
  title: {
    type: Schema.Types.String,
    required: [true, "Title Harus diisi!"],
  },
  description: {
    type: Schema.Types.String,
  },
  contributor: {
    type: Schema.Types.String,
  },
  creator: {
    type: Schema.Types.String,
  },
  publisher: {
    type: Schema.Types.String,
  },
  resource_identifier: {
    type: Schema.Types.String,
  },
  rights: {
    type: Schema.Types.String,
  },
  source: {
    type: Schema.Types.String,
  },
  subject: {
    type: Schema.Types.String,
  },
  date_created: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
    default: "/public/images/default.png",
  },
});

module.exports = model("Bibliography", bibliografiSchema);
