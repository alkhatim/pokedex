const { pokemonAPI, translationsAPI } = require("../utils/API");

const getPokemon = async (req, res) => {
	try {
		const { data } = await pokemonAPI.get(
			`/pokemon-species/${req.params.name}`
		);

		const pokemon = {
			name: data.name,
			description: data.flavor_text_entries
				.find((item) => item.language.name === "en")
				?.flavor_text?.replace(/(\n|\f)/g, " "),
			habitat: data.habitat.name,
			isLegendary: data.is_legendary,
		};

		res.status(200).send(pokemon);
	} catch (error) {
		if (error.isAxiosError && error.response && error.response.status === 404) {
			return res.status(404).send({
				message: "POKEMON_NOT_FOUND",
				status: 404,
			});
		}
		res.status(500).send(error);
	}
};

const getPokemonTranslated = async (req, res) => {
	try {
		const { data } = await pokemonAPI.get(
			`/pokemon-species/${req.params.name}`
		);

		const description = data.flavor_text_entries
			.find((item) => item.language.name === "en")
			?.flavor_text?.replace(/(\n|\f)/g, " ");

		const translationType =
			data.is_legendary || data.habitat.name === "cave"
				? "yoda"
				: "shakespeare";

		let translatedDesc = description;
		try {
			const { data: translation } = await translationsAPI.post(
				`/${translationType}`,
				{
					text: description,
				}
			);
			translatedDesc = translation.contents.translated;
		} catch (error) {
			console.log(error);
		}

		const pokemon = {
			name: data.name,
			description: translatedDesc,
			habitat: data.habitat.name,
			isLegendary: data.is_legendary,
		};

		res.status(200).send(pokemon);
	} catch (error) {
		if (error.isAxiosError && error.response && error.response.status === 404) {
			return res.status(404).send({
				message: "POKEMON_NOT_FOUND",
				status: 404,
			});
		}
		res.status(500).send(error);
	}
};

module.exports = {
	getPokemon,
	getPokemonTranslated,
};
