const { default: axios } = require("axios");

const pokemonAPI = axios.create({
	baseURL: "https://pokeapi.co/api/v2/",
});

const translationsAPI = axios.create({
	baseURL: "https://api.funtranslations.com/translate/",
});

module.exports = {
	pokemonAPI,
	translationsAPI,
};
