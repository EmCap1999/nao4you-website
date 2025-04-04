const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const router = require("./routes/firebase.auth.routes");
const { getServerErrorMessage } = require("./errors/server.errors");

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
	if (!process.env.PORT) {
		console.error("❌ Error: Please define the PORT in your .env file.");
		process.exit(1);
	}

	try {
		app.use(express.json());
		app.use(cookieParser());
		app.use(router);

		app.listen(PORT, () => {
			console.log("✅ Node.js server is running.");
		});
	} catch (error) {
		console.error("❌ Node Server startup error:", error);
		console.error(getServerErrorMessage(error.code));
		process.exit(1);
	}
}

(async () => {
	try {
		await startServer();
	} catch (error) {
		console.error("❌ Failed to start the server:", error);
		process.exit(1);
	}
})();
