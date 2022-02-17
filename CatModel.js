const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
  nom: String,
  color: String,
  age: Number,
});
const Cat = mongoose.model("Cat", catSchema);

module.exports = Cat;
