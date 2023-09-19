const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contentSchema = new Schema({
  page: {
    type: Schema.Types.Number,
  },
  text: {
    type: Schema.Types.String,
  },
  book: {
    type: Schema.Types.String,
    ref: "Bibliography",
  },
});

module.exports = model("Content", contentSchema);
