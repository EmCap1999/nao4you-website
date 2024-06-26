const { admin } = require("../config/firebase");

// token verification for access.
const verifyToken = async (req, res, next) => {
    const idToken = req.cookies.access_token;
    if (!idToken) {
        return res.status(403).json({ error: 'Aucun token correspondant.' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Erreur lors de la vérification de token: ', error);
        return res.status(403).json({ error: 'Non-autorisé.' });
    }
};

module.exports = verifyToken;