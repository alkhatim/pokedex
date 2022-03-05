const express = require("express");
const router = express.Router();

const controller = require("../controllers/pokemon");

router.get("/:name", controller.getPokemon);

router.get("/translated/:name", controller.getPokemonTranslated);

module.exports = router;
