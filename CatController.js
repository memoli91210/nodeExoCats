const Cat = require("../models/CatModel");
const Blog = require("../models/BlogModel");

exports.afficher = async (req, res) => {
  try {
    let cats = await Cat.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.creation = async (req, res) => {
  try {
    let { nom, color, age } = req.body;
    let id = req.params;
    let blog = await Blog.findById(id);
    let cat = await Cat.create({ nom, color, age });
    blog.cats.push(cat);
    await blog.save();
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.afficherOne = async (req, res) => {
  try {
    let { id } = req.params;
    let cat = await Cat.findById(id);
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.modifier = async (req, res) => {
  try {
    let { id } = req.params;
    let { nom, age } = req.body;
    let cat = await Cat.findById(id);
    cat.nom = nom;
    cat.age = age;
    await cat.save();
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.supprimer = async (req, res) => {
  try {
    let { id } = req.params;
    let cat = await Cat.findById(id);
    await cat.delete();
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
};
