// middleware/verifyToken.js
const { admin } = require("../config/firebase");
const { handleTokenVerificationError } = require("../middleware/auth.error.handler");

const verifyToken = async (req, res, next) => {
    const idToken = req.cookies.access_token;

    if (!idToken) {
        return res.status(403).json({ message: 'Utilisateur déconnecté.' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        await admin.auth().getUser(decodedToken.uid);
        req.user = decodedToken;
        next();
    } catch (error) {
        handleTokenVerificationError(error, res);
    }
};

module.exports = { verifyToken };