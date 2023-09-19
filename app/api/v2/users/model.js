const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

const usersSchema = Schema({
  name: {
    type: Schema.Types.String,
    minlength: [3, "Panjang nama minimal 3 karakter"],
    maxLength: [20, "Panjang nama maksimal 20 karakter"],
    required: [true, "Nama user harus diisi"],
  },
  password: {
    type: Schema.Types.String,
    minlength: [7, "Panjang password minimal 8 karakter"],
    required: [true, "password harus diisi"],
  },
  email: {
    type: Schema.Types.String,
    required: [true, "email harus diisi"],
  },
  role: {
    type: Schema.Types.String,
    enum: ["admin", "super admin"],
    required: [true, "isi role"],
  },
});

usersSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

usersSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model("Users", usersSchema);
