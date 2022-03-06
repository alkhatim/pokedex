const express = require("express");
const app = express();

const pokemonRouter = require("./routers/pokemon");

app.use("/pokemon", pokemonRouter);

app.use((req, res) => {
	res.status(404).send("NOT_FOUND");
});

module.exports = app;
