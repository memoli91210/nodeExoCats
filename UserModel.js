const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;