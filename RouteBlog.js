const express = require("express");
const controle = require("../Controlers/BlogController");
const router = express.Router();

router.get("/", controle.afficher);
router.get("/getmore10", controle.affichermore10);
router.get("/gettitre", controle.affichertitre);
router.post("/", controle.creation);

router.get("/:id", controle.afficherOne);

router.put("/:id", controle.modifier);

router.delete("/:id", controle.supprimer);

module.exports = router;
