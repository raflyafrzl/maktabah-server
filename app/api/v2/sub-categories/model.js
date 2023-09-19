const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let subCategoriesSchema = Schema({
  name: {
    type: String,
    minlength: [3, "Panjang nama sub kategori minimal 3 karakter"],
    maxLength: [20, "Panjang nama sub kategori maksimal 20 karakter"],
    required: [true, "Nama Sub Kategori harus diisi"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = model("SubCategory", subCategoriesSchema);
