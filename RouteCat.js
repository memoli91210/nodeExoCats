const express = require("express");
const controle = require("../Controlers/CatController");
const router = express.Router();

router.get("/", controle.afficher);

router.post("/:id", controle.creation); // id du blog

router.get("/:id", controle.afficherOne);

router.put("/:id", controle.modifier);

router.delete("/:id", controle.supprimer);

module.exports = router;

// async function createCat(nom, color, age) {
//   try {
//     let cat = await Cat.create({ nom, color, age });
//     console.log(cat);
//   } catch (err) {
//     console.log(err);
//   }
// }

//createCat("minou", "gris", 2);
//createCat("minou2", "gris", 2);

// async function getAllCats() {
//   try {
//     let cats = await Cat.find();
//     console.log(cats);
//   } catch (err) {
//     console.log(err);
//   }
// }
//getAllCats();

// async function getCat(id) {
//   try {
//     let cat = await Cat.findById(id);
//     console.log(cat);
//   } catch (err) {
//     console.log(err);
//   }
// }

//getCat("61b8a401e6d0e1feaf172879");

// async function updateChatNom(id, newName) {
//   try {
//     let cat = await Cat.findById(id);
//     cat.nom = newName;
//     await cat.save();
//     console.log(cat);
//   } catch (err) {
//     console.log(err);
//   }
// }
//updateChatNom("61b8a401e6d0e1feaf172879", "noumi");

// async function deleteCat(id) {
//   try {
//     let cat = await Cat.findById(id);
//     await cat.delete();
//     console.log(cat);
//   } catch (err) {
//     console.log(err);
//   }
// }
//deleteCat("61b8a401e6d0e1feaf172879");
