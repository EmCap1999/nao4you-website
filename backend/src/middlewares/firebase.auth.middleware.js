const { admin } = require("../configs/firebase.auth.config");
const { getFirebaseErrorMessage } = require("../errors/firebase.errors");
Ò;

const verifyToken = async (req, res, next) => {
	const idToken = req.cookies.access_token;

	if (!idToken) {
		return res
			.status(403)
			.json({ error: "Aucun token fourni lors de la vérification." });
	}

	try {
		req.user = await admin.auth().verifyIdToken(idToken);
		next();
	} catch (error) {
		console.error("Error verifying token:", error);
		const errorMessage = getFirebaseErrorMessage(error.code);
		return res.status(403).json({ error: errorMessage });
	}
};

module.exports = verifyToken;
