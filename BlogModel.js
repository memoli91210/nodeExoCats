const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  titre: String,
  post: String,
  nbrPost: Number,
  date: { type: Date, default: Date.now() },
  cat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cat", default: [] }],
});
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
