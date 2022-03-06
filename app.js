const express = require("express");
const app = express();

const pokemonRouter = require("./routers/pokemon");

app.use("/pokemon", pokemonRouter);

module.exports = app;
