const { admin } = require("../config/firebase");
const { handleTokenVerificationError } = require("../middleware/auth.error.handler");

const verifyToken = async (req, res, next) => {
    const idToken = req.cookies.access_token;
    if (!idToken) {
        return res.status(403).json({ message: 'Aucun token correspondant.' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        handleTokenVerificationError(error, res);
    }
};

module.exports = verifyToken;