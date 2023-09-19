const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tableOfContentSchema = new Schema({
  page: {
    type: Schema.Types.Number,
  },
  text: {
    type: Schema.Types.String,
  },
  children: {
    type: Schema.Types.Array,
  },
  book: {
    type: Schema.Types.String,
    ref: "Bibliography",
  },
});

module.exports = model("Tableofcontent", tableOfContentSchema);
