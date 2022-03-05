const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const pokemonRouter = require("./routers/pokemon");

app.use("/pokemon", pokemonRouter);

app.listen(PORT, () => console.log(`### Running on port: ${PORT}`));

module.exports = app;
