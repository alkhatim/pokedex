const request = require("supertest");
const app = require("../app");
const { pokemonAPI, translationsAPI } = require("../utils/API");

describe("Pokemon API Tests", () => {
	beforeAll(() => {
		jest
			.spyOn(translationsAPI, "post")
			.mockImplementation(async (url, payload) => ({
				data: {
					contents: {
						translated: payload.text + url,
					},
				},
			}));
	});
	it("returns 404 for incorrect urls", async () => {
		const res = await request(app).get("/pokemon");
		expect(res.status).toBe(404);
	});
	it("returns 404 when pokemon is not found", async () => {
		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(() => {
			return Promise.reject({
				isAxiosError: true,
				response: { status: 404 },
			});
		});
		const res = await request(app).get("/pokemon/notfound");
		expect(res.status).toBe(404);
		expect(res.body.message).toBe("POKEMON_NOT_FOUND");
	});
	it("returns 500 when unexpected error", async () => {
		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(() => {
			return Promise.reject({
				message: "internal",
			});
		});
		const res = await request(app).get("/pokemon/test");
		expect(res.status).toBe(500);
		expect(res.body.message).toBe("internal");
	});
	it("returns a pokemon", async () => {
		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(async () => ({
			data: {
				name: "test",
				flavor_text_entries: [
					{ language: { name: "en" }, flavor_text: "testDesc" },
				],
				habitat: { name: "testHabitat" },
				is_legendary: true,
			},
		}));
		const res = await request(app).get("/pokemon/test");
		expect(res.status).toBe(200);
		expect(res.body.name).toBe("test");
		expect(res.body.description).toBe("testDesc");
		expect(res.body.habitat).toBe("testHabitat");
		expect(res.body.isLegendary).toBe(true);
	});
	it("returns a translation for a legendary pokemon", async () => {
		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(async () => ({
			data: {
				name: "test",
				flavor_text_entries: [
					{ language: { name: "en" }, flavor_text: "testDesc" },
				],
				habitat: { name: "testHabitat" },
				is_legendary: true,
			},
		}));

		const res = await request(app).get("/pokemon/translated/test");
		expect(res.status).toBe(200);
		expect(res.body.name).toBe("test");
		expect(res.body.description).toBe("testDesc/yoda");
	});
	it("returns a translation for a cave pokemon", async () => {
		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(async () => ({
			data: {
				name: "test",
				flavor_text_entries: [
					{ language: { name: "en" }, flavor_text: "testDesc" },
				],
				habitat: { name: "cave" },
				is_legendary: false,
			},
		}));

		const res = await request(app).get("/pokemon/translated/test");
		expect(res.status).toBe(200);
		expect(res.body.name).toBe("test");
		expect(res.body.description).toBe("testDesc/yoda");
	});
	it("returns a shakespeare translation for a pokemon", async () => {
		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(async () => ({
			data: {
				name: "test",
				flavor_text_entries: [
					{ language: { name: "en" }, flavor_text: "testDesc" },
				],
				habitat: { name: "testHabitat" },
				is_legendary: false,
			},
		}));

		const res = await request(app).get("/pokemon/translated/test");
		expect(res.status).toBe(200);
		expect(res.body.name).toBe("test");
		expect(res.body.description).toBe("testDesc/shakespeare");
	});
	it("returns original translation when error", async () => {
		jest.spyOn(translationsAPI, "post").mockImplementationOnce(async () => {
			return Promise.reject();
		});

		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(async () => ({
			data: {
				name: "test",
				flavor_text_entries: [
					{ language: { name: "en" }, flavor_text: "testDesc" },
				],
				habitat: { name: "testHabitat" },
				is_legendary: false,
			},
		}));

		const res = await request(app).get("/pokemon/translated/test");
		expect(res.status).toBe(200);
		expect(res.body.name).toBe("test");
		expect(res.body.description).toBe("testDesc");
	});
	it("returns 404 on translated when pokemon is not found", async () => {
		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(() => {
			return Promise.reject({
				isAxiosError: true,
				response: { status: 404 },
			});
		});
		const res = await request(app).get("/pokemon/translated/notfound");
		expect(res.status).toBe(404);
		expect(res.body.message).toBe("POKEMON_NOT_FOUND");
	});
	it("returns 500 on translated when unexpected error", async () => {
		jest.spyOn(pokemonAPI, "get").mockImplementationOnce(() => {
			return Promise.reject({
				message: "internal",
			});
		});
		const res = await request(app).get("/pokemon/translated/test");
		expect(res.status).toBe(500);
		expect(res.body.message).toBe("internal");
	});
});
