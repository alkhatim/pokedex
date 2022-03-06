const app = require("./app");

const PORT = process.env.PORT || 8080;

try {
	app.listen(PORT, () => console.log(`### Running on port: ${PORT}`));
} catch (error) {
	console.log(error);
}
