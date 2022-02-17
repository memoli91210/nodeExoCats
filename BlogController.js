const Blog = require("../models/BlogModel");

exports.afficher = async (req, res) => {
  try {
    let blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.creation = async (req, res) => {
  try {
    let { titre, post, nbrPost, date } = req.body;
    let blog = await Blog.create({ titre, post, nbrPost, date });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.afficherOne = async (req, res) => {
  try {
    let { id } = req.params;
    let blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.modifier = async (req, res) => {
  try {
    let { id } = req.params;
    let { titre, post } = req.body;
    let blog = await Blog.findById(id);
    blog.titre = titre;
    blog.post = post;
    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.supprimer = async (req, res) => {
  try {
    let { id } = req.params;
    let blog = await Blog.findById(id);
    await blog.delete();
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.affichermore10 = async (req, res) => {
  try {
    let blogs = await Blog.find({ nbrPost: { $gte: 10 } });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.affichertitre = async (req, res) => {
  try {
    let blogs = await Blog.find({ titre: "String", post: "String" });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json(err);
  }
};
